import { CreateAbstractMethodCallError } from '../../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../../../trait/trait-class';
import { TIteratorSomeCallback } from './iterator-some';


export abstract class TraitIteratorSome<GValue> extends Trait {
  some(callback: TIteratorSomeCallback<GValue>): boolean {
    throw CreateAbstractMethodCallError('some');
  }
}

