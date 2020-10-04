import { TGenericTrait, TWithImplementedTrait } from './trait-types';
import { GetTraitMethodsAsArray, TInferTraitMethodsAsArray } from './get-trait-methods';
import { MethodOrChildIsImplementedBy } from '../method/method-is-implemented-by';

/**
 * Returns true if 'trait' or any of its child's traits is implemented by 'target'
 */
export function TraitIsImplementedBy<GTrait extends TGenericTrait, GTarget>(
  trait: GTrait,
  target: GTarget,
): target is TWithImplementedTrait<GTarget, GTrait> {
  const methods: TInferTraitMethodsAsArray<GTrait> = GetTraitMethodsAsArray<GTrait>(trait);
  for (let i = 0, l = methods.length; i < l; i++) {
    if (!MethodOrChildIsImplementedBy(methods[i], target)) {
      return false;
    }
  }
  return true;
}

/*---*/

const TRAIT_IS_IMPLEMENTED_BY_CACHE = new WeakMap<any, WeakMap<any, boolean>>(); // [target, [trait, implementedBy]]

export function TraitIsImplementedByCached<GTrait extends TGenericTrait, GTarget>(
  trait: GTrait,
  target: GTarget,
): target is TWithImplementedTrait<GTarget, GTrait> {
  let cachedMap: WeakMap<any, boolean> | undefined = TRAIT_IS_IMPLEMENTED_BY_CACHE.get(target);
  // let cached: boolean;
  if (cachedMap === void 0) {
    cachedMap = new WeakMap<any, boolean>();
    TRAIT_IS_IMPLEMENTED_BY_CACHE.set(trait, cachedMap);
  }

  let cached: boolean | undefined = cachedMap.get(trait);

  if (cached === void 0) {
    cached = TraitIsImplementedBy<GTrait, GTarget>(trait, target);
    cachedMap.set(trait, cached);
  }

  return cached as boolean;
}
