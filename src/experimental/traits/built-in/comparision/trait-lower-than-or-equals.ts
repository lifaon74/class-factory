import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitLowerThanOrEquals<GInput> extends Trait {
  lowerThanOrEquals(value: GInput): boolean {
    throw CreateAbstractMethodCallError('lowerThanOrEquals');
  }
}
