import { TConstructorOrVoid, TGenericTraitStruct, TTraitToClassConstructorWithVoidAllowed } from '../trait-types';
import { TraitImplementFor } from './trait-implement-for';

/**
 * Creates and returns a class which implements a trait (this) and extends 'baseClass'
 */
export function TraitToClass<GThis extends TGenericTraitStruct, GBaseClass extends TConstructorOrVoid>(
  this: GThis,
  baseClass?: GBaseClass,
): TTraitToClassConstructorWithVoidAllowed<GThis, GBaseClass> {
  const TraitClass = (baseClass === void 0)
    ? class TraitClass {
    }
    : // @ts-ignore
    class TraitClass extends baseClass {
    };
  TraitImplementFor.call(this, TraitClass.prototype);
  return TraitClass as any;
}

