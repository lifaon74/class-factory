import { CreateAbstractMethodCallError } from '../../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../../../trait/trait-class';


export abstract class TraitIteratorToArray<GValue> extends Trait {
  toArray(): GValue[] {
    throw CreateAbstractMethodCallError('toArray');
  }
}

