import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitGreaterThan<GInput> extends Trait {
  greaterThan(value: GInput): boolean {
    throw CreateAbstractMethodCallError('greaterThan');
  }
}
