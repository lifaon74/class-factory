import { TraitArrayLike } from '../trait-array-like';
import { TIterateFunction } from '../array-types';
import { ALLOC, TraitAllocOLD } from '../../others/trait-alloc/trait-alloc';
import { Trait } from '../../../trait/trait-class';
import { TraitArrayPush } from '../trait-array-push';
import { MixTraitsWithInterfaceTyping } from '../../../trait/mix-traits';
import { TraitArrayMap } from './trait-array-map';


interface ITraitArrayMapUsingAllocAndPushSuperTraits<GValue> extends TraitArrayMap<GValue>, TraitAllocOLD<{}>, TraitArrayPush<GValue> {
}

export abstract class TraitArrayMapUsingAllocAndPush<GValue> extends MixTraitsWithInterfaceTyping<ITraitArrayMapUsingAllocAndPushSuperTraits<any>, typeof Trait>([TraitArrayMap, TraitAllocOLD, TraitArrayPush], Trait) {
  map<GMappedValue>(callback: TIterateFunction<GValue, this, GMappedValue>): TraitArrayLike<GMappedValue> {
    const array: TraitArrayLike<GMappedValue> = this[ALLOC]({}) as TraitArrayLike<GMappedValue>;
    for (let i: number = 0, l = this.length(); i < l; i++) {
      this.push(callback(this.item(i), i, this));
    }
    return array;
  }
}
