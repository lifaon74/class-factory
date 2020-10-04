import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitNegate<GInput, GOutput> extends Trait {
  negate(): GOutput {
    throw CreateAbstractMethodCallError('negate');
  }
}
