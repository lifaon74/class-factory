import { TGenericTrait, TInferTraitMethods, TWithImplementedTrait } from './trait-types';
import { GetTraitMethodsAsArray, TInferTraitMethodsAsArray } from './get-trait-methods';
import { ImplementMethodOnObject, TImplementMethodOnObjectOverride } from '../method/implement-method-on-object';


/**
 * Implements 'trait' on a 'target'
 */
export function ImplementTraitOnObject<GTrait extends TGenericTrait, GTarget>(
  trait: GTrait,
  target: GTarget,
  override?: TImplementMethodOnObjectOverride,
): TWithImplementedTrait<GTarget, GTrait> {
  type TMethods = TInferTraitMethods<GTrait>;
  const methods: TInferTraitMethodsAsArray<GTrait> = GetTraitMethodsAsArray<GTrait>(trait);
  for (let i = 0, l = methods.length; i < l; i++) {
    ImplementMethodOnObject<TMethods, GTarget>(methods[i], target, override);
  }
  return target as TWithImplementedTrait<GTarget, GTrait>;
}
