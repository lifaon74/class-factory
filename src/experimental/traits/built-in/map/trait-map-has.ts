import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';


export abstract class TraitMapHas<GKey> extends Trait {
  has(key: GKey): boolean {
    throw CreateAbstractMethodCallError('has');
  }
}

