import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitRemainder<GInput, GOutput> extends Trait {
  remainder(value: GInput): GOutput {
    throw CreateAbstractMethodCallError('remainder');
  }
}
