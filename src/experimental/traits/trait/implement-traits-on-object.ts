import { TGenericTrait, TWithImplementedTraits } from './trait-types';
import { ImplementTraitOnObject } from './implement-trait-on-object';
import { TImplementMethodOnObjectOverride } from '../method/implement-method-on-object';

export function ImplementTraitsOnObject<GTrait extends TGenericTrait, GTarget>(
  traits: readonly GTrait[],
  target: GTarget,
  override?: TImplementMethodOnObjectOverride,
): TWithImplementedTraits<GTarget, GTrait> {
  for (let i = 0, l = traits.length; i < l; i++) {
    ImplementTraitOnObject<GTrait, GTarget>(traits[i], target, override);
  }
  return target as TWithImplementedTraits<GTarget, GTrait>;
}
