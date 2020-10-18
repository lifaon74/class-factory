import { TGenericTraitStruct, TInferTraitMethods, TWithImplementedTrait } from '../trait-types';
import { CallFunction } from '../../derived-function/call-function';
import { MethodIsImplementedBy } from '../../method/functions/method-is-implemented-by';


/**
 * Returns true if a trait (this) or any of it's derived traits is implemented by 'target'
 * @method
 */
export function TraitIsImplementedBy<GThis extends TGenericTraitStruct, GTarget>(
  this: GThis,
  target: GTarget,
): target is TWithImplementedTrait<GTarget, GThis> {
  type GMethods = TInferTraitMethods<GThis>;
  const iterator: Iterator<GMethods> = this.methods[Symbol.iterator]() as Iterator<GMethods>;
  let result: IteratorResult<GMethods>;
  while (!(result = iterator.next()).done) {
    if (!CallFunction(MethodIsImplementedBy, result.value, [target])) {
      return false;
    }
  }
  return true;
}
