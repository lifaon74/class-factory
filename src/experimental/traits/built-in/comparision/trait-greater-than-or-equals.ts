import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitGreaterThanOrEquals<GInput> extends Trait {
  greaterThanOrEquals(value: GInput): boolean {
    throw CreateAbstractMethodCallError('greaterThanOrEquals');
  }
}
