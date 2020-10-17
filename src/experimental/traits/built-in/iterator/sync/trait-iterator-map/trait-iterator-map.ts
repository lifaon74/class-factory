import { CreateAbstractMethodCallError } from '../../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../../../trait/trait-class';
import { TraitIteratorNext } from '../trait-iterator-next/trait-iterator-next';
import { TIteratorMapCallback } from './iterator-map';


export abstract class TraitIteratorMap<GValue, GReturn, GNext> extends Trait {
  map<GMappedValue>(callback: TIteratorMapCallback<GValue, GMappedValue>): TraitIteratorNext<GMappedValue, GReturn, GNext> {
    throw CreateAbstractMethodCallError('map');
  }
}

