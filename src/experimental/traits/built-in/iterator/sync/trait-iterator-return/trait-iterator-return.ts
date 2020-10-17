import { CreateAbstractMethodCallError } from '../../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../../../trait/trait-class';


export abstract class TraitIteratorReturn<GValue, GReturn> extends Trait implements Required<Pick<Iterator<GValue, GReturn, unknown>, 'return'>> {
  return(value?: GReturn): IteratorResult<GValue, GReturn> {
    throw CreateAbstractMethodCallError('return');
  }
}
