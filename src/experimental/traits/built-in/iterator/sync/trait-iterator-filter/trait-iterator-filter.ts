import { CreateAbstractMethodCallError } from '../../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../../../trait/trait-class';
import { TraitIteratorNext } from '../trait-iterator-next/trait-iterator-next';
import { TIteratorFilterCallback } from './iterator-filter';


export abstract class TraitIteratorFilter<GValue, GReturn, GNext> extends Trait {
  filter(callback: TIteratorFilterCallback<GValue>): TraitIteratorNext<GValue, GReturn, GNext> {
    throw CreateAbstractMethodCallError('filter');
  }
}

