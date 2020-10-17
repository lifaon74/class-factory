import { TraitArrayLike } from './trait-array-like';
import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';

export abstract class TraitArraySlice<GValue> extends TraitArrayLike<GValue> {
  slice(start?: number, end?: number): this {
    throw CreateAbstractMethodCallError('slice');
  }
}

