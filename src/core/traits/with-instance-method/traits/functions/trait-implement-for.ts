import { TGenericTraitStruct, TInferTraitMethods, TWithImplementedTrait } from '../trait-types';
import { MethodImplementFor } from '../../method/functions/method-implement-for';


/**
 * Implements 'trait' on 'target'
 */
export function TraitImplementFor<GTrait extends TGenericTraitStruct, GTarget>(
  trait: GTrait,
  target: GTarget,
): TWithImplementedTrait<GTarget, GTrait> {
  type GMethods = TInferTraitMethods<GTrait>;
  const iterator: Iterator<GMethods> = trait.methods[Symbol.iterator]() as Iterator<GMethods>;
  let result: IteratorResult<GMethods>;
  while (!(result = iterator.next()).done) {
    MethodImplementFor.call(result.value, target);
  }
  return target as TWithImplementedTrait<GTarget, GTrait>;
}
