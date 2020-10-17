import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { TraitIterable } from '../iterator/sync/trait-iterable/trait-iterable';

// TODO replace by TraitArrayItem, TraitArrayLength, and TraitArrayIterableUsingItemAndLength

export abstract class TraitArrayLike<GValue> extends TraitIterable<GValue, void, void> {
  length(): number {
    throw CreateAbstractMethodCallError('length');
  }

  item(index: number): GValue {
    throw CreateAbstractMethodCallError('item');
  }

  // * [Symbol.iterator](): TraitGenerator<GValue> {
  //   for (let i: number = 0, l = this.length(); i < l; i++) {
  //     yield this.item(i);
  //   }
  // }
}

// TODO => better job !
(TraitArrayLike.prototype as any)[Symbol.iterator] = function * <GValue>(this: TraitArrayLike<GValue>): Generator<GValue> {
  for (let i: number = 0, l = this.length(); i < l; i++) {
    yield this.item(i);
  }
}
