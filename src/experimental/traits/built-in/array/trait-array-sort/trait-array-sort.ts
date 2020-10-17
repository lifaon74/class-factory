import { TraitArrayLike } from '../trait-array-like';
import { CreateAbstractMethodCallError } from '../../../../class-helpers/abstract/create-abstract-method-error';
import { TCompareFunction } from '../array-types';

export abstract class TraitArraySort<GValue> extends TraitArrayLike<GValue> {
  sort(compareFunction?: TCompareFunction<GValue>): this {
    throw CreateAbstractMethodCallError('sort');
  }
}

