/**
 * A Trait is expressed only through an object (a class)
 * A Trait may extend another
 * A Trait only contain methods
 */

export { ImplementTraitOnObject as implementTrait } from './trait/implement-trait-on-object';
export { ImplementTraitsOnObject as implementTraits } from './trait/implement-traits-on-object';
export { TraitIsImplementedBy as traitIsImplementedBy } from './trait/trait-is-implemented-by';
export {
  MixTraitsAsUnion as mixTraitsAsUnion,
  MixTraitsAsInterface as mixTraitsAsInterface,
} from './trait/mix-traits';
export {
  CallTraitMethod as callTraitMethod,
  CallTraitMethodOnObject as callTraitMethodOnObject,
} from './trait/call-trait-method';
