import { TGenericFunction, TInferFunctionThis, TupleTypes, UnionToObject } from '../types/misc-types';
import { TGenericTraitFunction, TraitFunction } from './trait-function-class';


/**
 * A trait is simply a collection of TraitFunction
 */

export type TTraitFunctionUnionToTraitObject<GTraitFunctions extends TGenericTraitFunction> = UnionToObject<GTraitFunctions extends TraitFunction<infer GPropertyKey, infer GFunction>
  ? [GPropertyKey, GFunction]
  : never>;

export type TTraitFunctionUnionToInstance<GTraitFunctions extends TGenericTraitFunction> =
  GTraitFunctions extends TraitFunction<PropertyKey, infer GFunction>
    ? TInferFunctionThis<GFunction>
    : never;

export type TWithImplementedTrait<GObject, GTraitFunctions extends TGenericTraitFunction> =
  GObject
  & TTraitFunctionUnionToTraitObject<GTraitFunctions>;

export type TDerivedTraitTraitFunctions<GTraitFunctions extends TGenericTraitFunction,
  GDerivedTraitFunctions extends TGenericTraitFunction,
  > =
  GTraitFunctions extends TraitFunction<infer GInferredPropertyKey, TGenericFunction>
    ? (
      [GDerivedTraitFunctions] extends [TraitFunction<infer GInferredDerivedPropertyKey, TGenericFunction>]
        ? (
          GInferredPropertyKey extends GInferredDerivedPropertyKey
            ? GDerivedTraitFunctions
            : GTraitFunctions
          )
        : never
      )
    : never;

export type TInferTraitTraitFunctions<GTrait extends TGenericTrait> =
  GTrait extends Trait<infer GTraitFunctions>
    ? GTraitFunctions
    : never;

export type TMixTraitsFunctions<GTraits extends readonly TGenericTrait[]> = TupleTypes<{
  [GKey in Extract<keyof GTraits, number>]: TInferTraitTraitFunctions<GTraits[GKey]>;
}>;

export type TGenericTrait = Trait<TGenericTraitFunction>;

// type TTraitFnc1 = TraitFunction<'a', (value?: string) => {}>;
// type TTraitFnc2 = TraitFunction<'a', () => {}>;
// type TTraitFnc3 = TraitFunction<'b', () => {}>;
// type TTraitFnc4 = TraitFunction<'c', () => {}>;
//
// const a: TDerivedTraitTraitFunctions<TTraitFnc2 | TTraitFnc4, TTraitFnc1 | TTraitFnc3>; // => TTraitFnc4
// const a: TTraitFunctionsContainsPropertyKey<[TraitFunction<'a', () => {}>, TraitFunction<'b', () => {}>], 'a'>;
// const a: TDerivedTrait<[TraitFunction<'a', (value?: string) => {}>], [TraitFunction<'a', () => {}>]>;

/**
 * GTraitFunctions: union of TraitFunction
 */
export class Trait<GTraitFunctions extends TGenericTraitFunction> {

  /**
   * Creates a new Trait from a list of traits
   */
  static mix<GTraits extends TGenericTrait[]>(...traits: GTraits): Trait<TMixTraitsFunctions<GTraits>> {
    return new Trait<TMixTraitsFunctions<GTraits>>(
      (
        traits
          .map((trait: TGenericTrait) => {
            return trait.traitFunctions;
          })
          .flat()
      ) as TMixTraitsFunctions<GTraits>[]
    );
  }

  readonly traitFunctions: ReadonlyArray<GTraitFunctions>;

  constructor(
    traitFunctions: Iterable<GTraitFunctions>,
  ) {
    this.traitFunctions = Object.freeze(Array.from(traitFunctions));
    for (let i = 0, l = this.traitFunctions.length - 1; i < l; i++) {
      const traitFunction: TGenericTraitFunction = this.traitFunctions[i];
      for (let j = i + 1; j <= l; j++) {
        if (traitFunction.propertyKey === this.traitFunctions[j].propertyKey) {
          throw new Error(`Received two TraitFunction with the same property key '${ String(traitFunction.propertyKey) }' at index ${ i } and ${ j }`);
        }
      }
    }
  }

  /**
   * Returns a TraitFunction having 'propertyKey' as name, or undefined
   */
  get(propertyKey: PropertyKey): GTraitFunctions | undefined  {
    return this.traitFunctions.find((traitFunction: TGenericTraitFunction) => {
      return traitFunction.propertyKey === propertyKey;
    });
  }

  /**
   * Creates a new Trait with more 'traitFunctions'.
   *  - 'traitFunctions' is allowed to contain derived function present in the current Trait
   */
  derive<GDerivedTraitFunctions extends TGenericTraitFunction>(
    traitFunctions: Iterable<GDerivedTraitFunctions>,
  ): Trait<TDerivedTraitTraitFunctions<GTraitFunctions, GDerivedTraitFunctions>> {
    type TNewTraitFunctions = TDerivedTraitTraitFunctions<GTraitFunctions, GDerivedTraitFunctions>;
    const traitFunctionsAsArray: GDerivedTraitFunctions[] = Array.isArray(traitFunctions)
      ? traitFunctions
      : Array.from(traitFunctions);
    return new Trait<TNewTraitFunctions>(
      (
        (this.traitFunctions as readonly TGenericTraitFunction[])
          .filter((traitFunctionA: TGenericTraitFunction) => {
            return traitFunctionsAsArray.every((traitFunctionB: TGenericTraitFunction, index: number) => {
              if (traitFunctionA.propertyKey === traitFunctionB.propertyKey) {
                if (traitFunctionB.isDerivedFrom(traitFunctionA)) {
                  return false;
                } else {
                  throw new Error(`Received a new TraitFunction with the property key '${ String(traitFunctionB.propertyKey) }' at index ${ index }, which already exists in this Trait and is not derived from the original`);
                }
              } else {
                return true;
              }
            });
          })
          .concat(traitFunctionsAsArray)
      ) as unknown as readonly TNewTraitFunctions[]
    );
  }

  /**
   * Implements this Trait for 'target
   */
  implementFor<GTarget extends TTraitFunctionUnionToInstance<GTraitFunctions>>(target: GTarget): TWithImplementedTrait<GTarget, GTraitFunctions> {
    for (let i = 0, l = this.traitFunctions.length; i < l; i++) {
      this.traitFunctions[i].implementFor(target);
    }
    return target as TWithImplementedTrait<GTarget, GTraitFunctions>;
  }

  /**
   * Returns true if 'target' implements this Trait
   */
  isImplementedBy<GTarget>(target: GTarget): target is TWithImplementedTrait<GTarget, GTraitFunctions> {
    // INFO faster than every
    for (let i = 0, l = this.traitFunctions.length; i < l; i++) {
      if (!this.traitFunctions[i].isImplementedBy(target)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns true if this trait is derived from 'trait'
   */
  isDerivedFrom(trait: TGenericTrait): boolean {
    if (trait.traitFunctions.length >= this.traitFunctions.length) {
      return this.traitFunctions.every((traitFunctionA: TGenericTraitFunction) => {
        return trait.traitFunctions.some((traitFunctionB: TGenericTraitFunction) => {
          return traitFunctionA.isDerivedFrom(traitFunctionB);
        });
      });
    } else {
      return false;
    }
  }

  /**
   * Returns true if this trait is similar to 'trait'
   */
  equals(trait: TGenericTrait): trait is Trait<GTraitFunctions> {
    if (trait.traitFunctions.length === this.traitFunctions.length) {
      return this.traitFunctions.every((traitFunctionA: TGenericTraitFunction) => {
        return trait.traitFunctions.some((traitFunctionB: TGenericTraitFunction) => {
          return traitFunctionA.equals(traitFunctionB);
        });
      });
    } else {
      return false;
    }
  }
}
