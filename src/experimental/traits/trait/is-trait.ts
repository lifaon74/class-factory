import { Trait } from './trait-class';
import { TGenericTrait } from './trait-types';

export function IsTrait(
  input: any,
): input is TGenericTrait {
  return (typeof input === 'function')
    && (input.prototype instanceof Trait);
}

