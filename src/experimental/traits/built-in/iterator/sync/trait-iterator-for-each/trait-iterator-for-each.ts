import { CreateAbstractMethodCallError } from '../../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../../../trait/trait-class';
import { TIteratorForEachCallback } from './iterator-for-each';

export abstract class TraitIteratorForEach<GValue> extends Trait {
  forEach(callback: TIteratorForEachCallback<GValue>): void {
    throw CreateAbstractMethodCallError('forEach');
  }
}

