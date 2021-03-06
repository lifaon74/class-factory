import { TGenericTraitStruct, TInferTraitMethods, TWithImplementedTrait } from '../trait-types';
import { MethodImplementFor } from '../../method/functions/method-implement-for';
import { CallFunction } from '../../derived-function/call-function';


/**
 * Implements a trait (this) on an object (target)
 */
export function TraitImplementFor<GThis extends TGenericTraitStruct, GTarget>(
  this: GThis,
  target: GTarget,
): TWithImplementedTrait<GTarget, GThis> {
  type GMethods = TInferTraitMethods<GThis>;
  const iterator: Iterator<GMethods> = this.methods[Symbol.iterator]() as Iterator<GMethods>;
  let result: IteratorResult<GMethods>;
  while (!(result = iterator.next()).done) {
    CallFunction(MethodImplementFor, result.value, [target]);
  }
  return target as TWithImplementedTrait<GTarget, GThis>;
}
