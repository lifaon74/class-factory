import { TConstructorOrVoid, TGenericTraitStruct, TTraitToClassConstructorWithVoidAllowed } from '../trait-types';
import { TraitImplementFor } from './trait-implement-for';

/**
 * Creates and returns a class which implements 'trait' and extends 'baseClass'
 */
export function TraitToClass<GTrait extends TGenericTraitStruct, GBaseClass extends TConstructorOrVoid>(
  trait: GTrait,
  baseClass?: GBaseClass,
): TTraitToClassConstructorWithVoidAllowed<GTrait, GBaseClass> {
  const TraitClass = (baseClass === void 0)
    ? class TraitClass {
    }
    : // @ts-ignore
    class TraitClass extends baseClass {
    };
  TraitImplementFor.call(trait, TraitClass.prototype);
  return TraitClass as any;
}

