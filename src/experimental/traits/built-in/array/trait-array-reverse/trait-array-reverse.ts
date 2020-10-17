import { TraitArrayLike } from '../trait-array-like';
import { CreateAbstractMethodCallError } from '../../../../class-helpers/abstract/create-abstract-method-error';

export abstract class TraitArrayReverse<GValue> extends TraitArrayLike<GValue> {
  reverse(): this {
    throw CreateAbstractMethodCallError('reverse');
  }
}

