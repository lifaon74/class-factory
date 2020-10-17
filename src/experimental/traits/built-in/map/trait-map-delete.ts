import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitMapDelete<GKey> extends Trait {
  delete(key: GKey): boolean {
    throw CreateAbstractMethodCallError('delete');
  }
}

