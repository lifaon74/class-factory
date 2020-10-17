import { CreateAbstractMethodCallError } from '../../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../../../trait/trait-class';

import { TraitIteratorNext } from '../trait-iterator-next/trait-iterator-next';

export abstract class TraitIterable<GValue, GReturn, GNext> extends Trait /*implements Iterable<GValue> */{
  [Symbol.iterator](): TraitIteratorNext<GValue, GReturn, GNext> {
    throw CreateAbstractMethodCallError('[Symbol.iterator]');
  }
}
