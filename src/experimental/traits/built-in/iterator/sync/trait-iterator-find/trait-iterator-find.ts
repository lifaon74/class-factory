import { CreateAbstractMethodCallError } from '../../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../../../trait/trait-class';
import { TIteratorFindCallback } from './iterator-find';


export abstract class TraitIteratorFind<GValue> extends Trait {
  find(callback: TIteratorFindCallback<GValue>): GValue | undefined {
    throw CreateAbstractMethodCallError('find');
  }
}

