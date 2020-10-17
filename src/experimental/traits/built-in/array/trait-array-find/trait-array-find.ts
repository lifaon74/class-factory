import { TraitArrayLike } from '../trait-array-like';
import { TIterateFunction } from '../array-types';
import { CreateAbstractMethodCallError } from '../../../../class-helpers/abstract/create-abstract-method-error';

export abstract class TraitArrayFind<GValue> extends TraitArrayLike<GValue> {
  find(callback: TIterateFunction<GValue, this, boolean>): GValue | undefined {
    throw CreateAbstractMethodCallError('find');
  }
}



