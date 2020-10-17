import { TraitArrayLike } from './trait-array-like';
import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';

export abstract class TraitArrayPop<GValue> extends TraitArrayLike<GValue> {
  pop(): GValue {
    throw CreateAbstractMethodCallError('pop');
  }
}
