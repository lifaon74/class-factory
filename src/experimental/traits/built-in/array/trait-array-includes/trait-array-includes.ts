import { TraitArrayLike } from '../trait-array-like';
import { CreateAbstractMethodCallError } from '../../../../class-helpers/abstract/create-abstract-method-error';


export abstract class TraitArrayIncludes<GValue> extends TraitArrayLike<GValue> {
  includes(value: GValue, fromIndex?: number): boolean {
    throw CreateAbstractMethodCallError('includes');
  }
}
