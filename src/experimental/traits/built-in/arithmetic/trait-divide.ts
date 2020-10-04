import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitDivide<GInput, GOutput> extends Trait {
  divide(value: GInput): GOutput {
    throw CreateAbstractMethodCallError('divide');
  }
}
