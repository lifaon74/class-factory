import { TraitArrayFindIndex } from '../trait-array-find-index';
import { TIterateFunction } from '../array-types';
import { TraitArrayFind } from './trait-array-find';
import { Trait } from '../../../trait/trait-class';
import { MixTraitsWithInterfaceTyping } from '../../../trait/mix-traits';

interface ITraitArrayFindUsingFindIndexSuperTraits<GValue> extends TraitArrayFind<GValue>, TraitArrayFindIndex<GValue> {
}

export abstract class TraitArrayFindUsingFindIndex<GValue> extends MixTraitsWithInterfaceTyping<ITraitArrayFindUsingFindIndexSuperTraits<any>, typeof Trait>([TraitArrayFind, TraitArrayFindIndex], Trait) {
  find(callback: TIterateFunction<GValue, this, boolean>): GValue | undefined {
    const index: number = this.findIndex(callback);
    return (index === -1)
      ? void 0
      : this.item(index);
  }
}



