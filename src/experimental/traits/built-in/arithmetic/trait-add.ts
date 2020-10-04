import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitAdd<GInput, GOutput> extends Trait {
  add(value: GInput): GOutput {
    throw CreateAbstractMethodCallError('add');
  }
}
