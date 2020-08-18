import { Constructor, ExcludeConstructor, TBaseClassIsUndefinedOrVoid } from '../types/class-types';
import {
  TGenericTrait, TInferTraitTraitFunctions, TTraitFunctionUnionToTraitObject, TWithImplementedTrait
} from './trait-class';


export type TSuperTraitInstance<GTrait extends TGenericTrait, GBaseClass extends Constructor> =
  TWithImplementedTrait<InstanceType<GBaseClass>, TInferTraitTraitFunctions<GTrait>>;

export type TSuperTrait<GTrait extends TGenericTrait, GBaseClass extends Constructor> =
  ExcludeConstructor<GBaseClass>
  & {
  new(...args: ConstructorParameters<GBaseClass>): TSuperTraitInstance<GTrait, GBaseClass>;
}


export type TSuperTraitWithVoidAllowed<GTrait extends TGenericTrait, GBaseClass extends (Constructor | void | undefined)> =
  TBaseClassIsUndefinedOrVoid<GBaseClass> extends true
    ? {
      new(): TTraitFunctionUnionToTraitObject<TInferTraitTraitFunctions<GTrait>>;
    }
    : TSuperTrait<GTrait, Exclude<GBaseClass, void | undefined>>;

/**
 * Returns a class which implements 'trait' and extends 'baseClass'
 */
export function SuperTrait<GTrait extends TGenericTrait, GBaseClass extends (Constructor | void | undefined)>(
  trait: GTrait,
  baseClass?: GBaseClass,
): TSuperTraitWithVoidAllowed<GTrait, GBaseClass> {
  const TraitClass = (baseClass === void 0)
    ? class TraitClass {}
    : // @ts-ignore
    class TraitClass extends baseClass {};
  trait.implementFor(TraitClass.prototype);
  return TraitClass as any;
}
