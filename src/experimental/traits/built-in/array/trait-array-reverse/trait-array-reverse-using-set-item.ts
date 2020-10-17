import { TraitArrayLike } from '../trait-array-like';
import { TraitArraySetItem } from '../trait-array-set-item';
import { MixTraitsWithInterfaceTyping } from '../../../trait/mix-traits';
import { TraitArrayReverse } from './trait-array-reverse';


interface ITraitArrayReverseUsingSetItemSuperTraits<GValue> extends TraitArrayReverse<GValue>, TraitArraySetItem<GValue> {
}

export abstract class TraitArrayReverseUsingSetItem<GValue> extends MixTraitsWithInterfaceTyping<ITraitArrayReverseUsingSetItemSuperTraits<unknown>, void>([TraitArrayReverse, TraitArrayLike]) {
  reverse(): this {
    const length: number = this.length();
    for (let i = 0, j = length - 1, l = Math.floor(length / 2); i < l; i++, j--) {
      const value: GValue = this.item(i) as GValue;
      this.setItem(i, this.item(j));
      this.setItem(j, value);
    }
    return this;
  }
}

