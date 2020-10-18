import { TGenericTraitStruct } from '../trait-types';
import { ToArray } from '../../../../misc';
import { TGenericMethodStruct } from '../../method/method-types';
import { CallFunction } from '../../derived-function/call-function';
import { MethodIsDerivedFrom } from '../../method/functions/method-is-derived-from';


/**
 * Returns true if a trait (this) is derived from 'trait'
 */
export function TraitIsDerivedFrom<GThis extends TGenericTraitStruct>(
  this: GThis,
  trait: TGenericTraitStruct
): boolean {
  const traitMethodsArrayA: TGenericMethodStruct[] = ToArray(this.methods);
  const traitMethodsArrayB: TGenericMethodStruct[] = ToArray(trait.methods);

  if (traitMethodsArrayA.length < traitMethodsArrayB.length) {
    return traitMethodsArrayA.every((traitMethodA: TGenericMethodStruct) => {
      return traitMethodsArrayB.some((traitMethodB: TGenericMethodStruct) => {
        return CallFunction(MethodIsDerivedFrom, traitMethodA, [traitMethodB]);
      });
    });
  } else {
    return false;
  }
}
