import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitLowerThan<GInput> extends Trait {
  lowerThan(value: GInput): boolean {
    throw CreateAbstractMethodCallError('lowerThan');
  }
}
