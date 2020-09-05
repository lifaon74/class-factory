import { TConstructorOrVoid, TGenericTraitStruct, TTraitToClassConstructorWithVoidAllowed } from '../trait-types';
import { TraitImplementFor } from './trait-implement-for';
import { CallFunction } from '../../derived-function/call-function';

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
  CallFunction(TraitImplementFor, this, [TraitClass.prototype]);
  return TraitClass as any;
}

