import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitSubtract<GInput, GOutput> extends Trait {
  subtract(value: GInput): GOutput {
    throw CreateAbstractMethodCallError('subtract');
  }
}
