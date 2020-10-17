import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';


export abstract class TraitArrayItem<GValue> extends Trait {
  item(index: number): GValue {
    throw CreateAbstractMethodCallError('item');
  }
}
