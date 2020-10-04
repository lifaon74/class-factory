import { TGenericTrait, TInferTraitPrototype } from './trait-types';
import { ImplementTraitOnObject } from './implement-trait-on-object';
import {
  TBaseClassIsUndefinedOrVoid,
  TClassOrVoid,
  TClassType,
  TInferClassInstance,
  TInferClassParameters,
  TOmitConstructorAndPrototype,
} from '../../types/class-types';
import { UnionToIntersection } from '../../types/union-to-intersection-type';


/** TYPES **/


// export interface TMixTraitsInterfaceWithoutBaseClass<GInterface> extends THavingPrototype<TNormalizeTraitPrototype<GInterface>> {
// export interface TMixTraitsInterfaceWithoutBaseClass<GInterface> {
//   new(): TNormalizeTraitPrototype<GInterface>;
// }

export interface TMixTraitsInterfaceWithoutBaseClass<GInterface> {
  new(): GInterface;
}

export type TMixTraitsInterfaceWithBaseClassInstance<GInterface, GBaseClass extends TClassType> =
  Omit<TInferClassInstance<GBaseClass>, keyof GInterface>
  & GInterface;

export interface TMixTraitsInterfaceWithBaseClassConstructor<GInterface, GBaseClass extends TClassType> {
  new(...args: TInferClassParameters<GBaseClass>): TMixTraitsInterfaceWithBaseClassInstance<GInterface, GBaseClass>;
}

export type TMixTraitsInterfaceWithBaseClass<GInterface, GBaseClass extends TClassType> =
  TOmitConstructorAndPrototype<GBaseClass>
  & TMixTraitsInterfaceWithBaseClassConstructor<GInterface, GBaseClass>;


export type TMixTraitsAsInterfaceWithOptionalBaseClass<GInterface, GBaseClass extends TClassOrVoid> =
  TBaseClassIsUndefinedOrVoid<GBaseClass> extends true
    ? TMixTraitsInterfaceWithoutBaseClass<GInterface>
    : (
      GBaseClass extends TClassType
        ? TMixTraitsInterfaceWithBaseClass<GInterface, GBaseClass>
        : never
      );


export type TMixTraitsAsUnionWithOptionalBaseClass<GTraitsUnion extends TGenericTrait, GBaseClass extends TClassOrVoid> =
  TMixTraitsAsInterfaceWithOptionalBaseClass<UnionToIntersection<TInferTraitPrototype<GTraitsUnion>>, GBaseClass>;


/*---*/

/**
 * Creates a Trait based on the intersection of many other Traits
 */
export function MixTraitsGeneric(
  traits: readonly TGenericTrait[],
  baseClass?: TClassOrVoid,
): any {
  const mixed: any = (
    (baseClass === void 0)
      ? class MixedTraits {
      }
      : // @ts-ignore
      class MixedTraits extends baseClass {
      }
  );

  for (let i = 0, li = traits.length; i < li; i++) {
    ImplementTraitOnObject<TGenericTrait, any>(traits[i], mixed.prototype, 'native');
  }
  return mixed;
}


/* TYPED */


/**
 * @example:
 * interface MixedTraits extends Trait1, Trait2, ... {}
 * MixTraitsAsInterface<MixedTraits, void>([Trait1, Trait2])
 */
export function MixTraitsAsInterface<GInterface, GBaseClass extends TClassOrVoid>(
  traits: readonly TGenericTrait[],
  baseClass?: GBaseClass,
): TMixTraitsAsInterfaceWithOptionalBaseClass<GInterface, GBaseClass> {
  return MixTraitsGeneric(traits, baseClass);
}

/*-*/

// INFO: sometimes typescript may struggle to infer properly the resulting mixed trait,
//   so choose accordingly the implementation which fulfill your requirements

/**
 * @example:
 * MixTraitsAsUnion([Trait1, Trait2]) => automatic inference
 * MixTraitsAsUnion<typeof Trait1 | typeof Trait2, void>([Trait1, Trait2])
 */
export function MixTraitsAsUnion<GTraitsUnion extends TGenericTrait, GBaseClass extends TClassOrVoid>(
  traits: readonly GTraitsUnion[],
  baseClass?: GBaseClass,
): TMixTraitsAsUnionWithOptionalBaseClass<GTraitsUnion, GBaseClass> {
  return MixTraitsGeneric(traits, baseClass);
}
