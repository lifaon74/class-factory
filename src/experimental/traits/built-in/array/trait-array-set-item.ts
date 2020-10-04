import { TraitArrayLike } from './trait-array-like';
import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';

export abstract class TraitArraySetItem<GValue> extends TraitArrayLike<GValue> {
  setItem(index: number, value: GValue): this {
    throw CreateAbstractMethodCallError('setItem');
  }
}

