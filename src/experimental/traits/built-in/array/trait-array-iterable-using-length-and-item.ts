import { TraitIterable } from '../iterator/sync/trait-iterable/trait-iterable';
import { Trait } from '../../trait/trait-class';
import { TraitArrayItem } from './trait-array-item';
import { TraitArrayLength } from './trait-array-length';
import { MixTraitsWithConstructorTyping } from '../../trait/mix-traits';

interface ITraitArrayIterableUsingLengthAndItemSuperTraits<GValue> extends TraitIterable<GValue>, TraitArrayItem<GValue>, TraitArrayLength<GValue> {
}

interface ITraitArrayIterableUsingLengthAndItemSuperTraitsConstructor extends Trait {
  new<GValue>(): ITraitArrayIterableUsingLengthAndItemSuperTraits<GValue>;
}

export abstract class TraitArrayIterableUsingLengthAndItem<GValue> extends MixTraitsWithConstructorTyping<ITraitArrayIterableUsingLengthAndItemSuperTraitsConstructor>([TraitIterable, TraitArrayItem, TraitArrayLength], Trait)<GValue> {
  * [Symbol.iterator](): IterableIterator<GValue> {
    for (let i: number = 0, l = this.length(); i < l; i++) {
      yield this.item(i);
    }
  }
}
