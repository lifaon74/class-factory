import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitNotEquals<GInput> extends Trait {
  notEquals(value: GInput): boolean {
    throw CreateAbstractMethodCallError('notEquals');
  }
}
