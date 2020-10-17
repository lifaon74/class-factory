import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitMapClear extends Trait {
  clear(): void {
    throw CreateAbstractMethodCallError('clear');
  }
}

