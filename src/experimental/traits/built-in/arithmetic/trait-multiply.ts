import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitMultiply<GInput, GOutput> extends Trait {
  multiply(value: GInput): GOutput {
    throw CreateAbstractMethodCallError('multiply');
  }
}
