import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';


export abstract class TraitMapGet<GKey, GValue> extends Trait {
  get(key: GKey): GValue | undefined {
    throw CreateAbstractMethodCallError('get');
  }
}

