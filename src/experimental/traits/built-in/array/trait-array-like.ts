import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { TraitIterable } from '../iterable/trait-iterable';


export abstract class TraitArrayLike<GValue> extends TraitIterable<GValue> {
  length(): number {
    throw CreateAbstractMethodCallError('length');
  }

  item(index: number): GValue {
    throw CreateAbstractMethodCallError('item');
  }

  * [Symbol.iterator](): IterableIterator<GValue> {
    for (let i: number = 0, l = this.length(); i < l; i++) {
      yield this.item(i);
    }
  }
}
