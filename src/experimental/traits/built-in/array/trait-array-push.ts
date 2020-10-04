import { TraitArrayLike } from './trait-array-like';
import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';

export abstract class TraitArrayPush<GValue> extends TraitArrayLike<GValue> {
  push(...items: GValue[]): this {
    throw CreateAbstractMethodCallError('push');
  }
}
