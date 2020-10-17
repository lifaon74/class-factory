import { CreateAbstractMethodCallError } from '../../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../../../trait/trait-class';
import { TIteratorEveryCallback } from './iterator-every';


export abstract class TraitIteratorEvery<GValue> extends Trait {
  every(callback: TIteratorEveryCallback<GValue>): boolean {
    throw CreateAbstractMethodCallError('every');
  }
}

