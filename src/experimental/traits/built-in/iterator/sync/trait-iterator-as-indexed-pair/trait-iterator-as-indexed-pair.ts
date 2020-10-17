import { CreateAbstractMethodCallError } from '../../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../../../trait/trait-class';
import { TraitIteratorNext } from '../trait-iterator-next/trait-iterator-next';


export abstract class TraitIteratorAsIndexedPair<GValue, GReturn, GNext> extends Trait {
  asIndexedPair(): TraitIteratorNext<[GValue, number], GReturn, GNext> {
    throw CreateAbstractMethodCallError('asIndexedPair');
  }
}

