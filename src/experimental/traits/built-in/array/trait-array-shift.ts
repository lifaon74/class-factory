import { TraitArrayLike } from './trait-array-like';
import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';

export abstract class TraitArrayShift<GValue> extends TraitArrayLike<GValue> {
  shift(): GValue {
    throw CreateAbstractMethodCallError('shift');
  }
}
