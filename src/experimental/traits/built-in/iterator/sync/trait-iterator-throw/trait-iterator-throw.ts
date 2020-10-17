import { CreateAbstractMethodCallError } from '../../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../../../trait/trait-class';


export abstract class TraitIteratorThrow<GValue, GReturn> extends Trait implements Required<Pick<Iterator<GValue, GReturn, unknown>, 'throw'>> {
  throw(error?: any): IteratorResult<GValue, GReturn> {
    throw CreateAbstractMethodCallError('throw');
  }
}
