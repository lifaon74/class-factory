import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export const NEW: unique symbol = Symbol('new');

export abstract class TraitNew extends Trait {
  [NEW](data: unknown): unknown {
    throw CreateAbstractMethodCallError('[NEW]');
  }
}





