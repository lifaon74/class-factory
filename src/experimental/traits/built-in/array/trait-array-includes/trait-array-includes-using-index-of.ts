import { TraitArrayIndexOf } from '../trait-array-index-of';
import { Trait } from '../../../trait/trait-class';
import { TraitArrayIncludes } from './trait-array-includes';
import { MixTraitsWithInterfaceTyping } from '../../../trait/mix-traits';

interface ITraitArrayIncludesUsingIndexOfSuperTraits<GValue> extends TraitArrayIncludes<GValue>, TraitArrayIndexOf<GValue> {
}

export abstract class TraitArrayIncludesUsingIndexOf<GValue> extends MixTraitsWithInterfaceTyping<ITraitArrayIncludesUsingIndexOfSuperTraits<any>, typeof Trait>([TraitArrayIncludes, TraitArrayIndexOf], Trait) {
  includes(value: GValue, fromIndex?: number): boolean {
    return (this.indexOf(value, fromIndex) !== -1);
  }
}
