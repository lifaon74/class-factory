import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitArrayLength<GValue> extends Trait {
  length(): number {
    throw CreateAbstractMethodCallError('length');
  }
}
