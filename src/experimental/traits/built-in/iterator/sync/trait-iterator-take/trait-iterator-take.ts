import { CreateAbstractMethodCallError } from '../../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../../../trait/trait-class';
import { TraitIteratorNext } from '../trait-iterator-next/trait-iterator-next';



export abstract class TraitIteratorTake<GValue, GReturn, GNext> extends Trait {
  take(limit: number): TraitIteratorNext<GValue, GReturn, GNext> {
    throw CreateAbstractMethodCallError('take');
  }
}

