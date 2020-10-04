import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitEquals<GInput> extends Trait {
  equals(value: GInput): boolean {
    throw CreateAbstractMethodCallError('equals');
  }
}
