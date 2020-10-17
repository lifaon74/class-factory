import { CreateAbstractMethodCallError } from '../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../../trait/trait-class';


export abstract class TraitArrayFill<GValue> extends Trait {
  fill(value: GValue, start?: number, end?: number): this {
    throw CreateAbstractMethodCallError('fill');
  }
}

