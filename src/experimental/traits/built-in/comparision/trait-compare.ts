import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export enum Ordering {
  Less = -1,
  Equal = 0,
  Greater = 1,
}

export function compareNumber(a: number, b: number) {
  if (a < b) {
    return Ordering.Less;
  } else if (a > b) {
    return Ordering.Greater;
  } else {
    return Ordering.Equal;
  }
}

export abstract class TraitCompare<GInput> extends Trait {
  /**
   * Compare 'this' with 'value'
   * Returns:
   *  Ordering.Less if this < value
   *  Ordering.Equal if this === value
   *  Ordering.Greater if this > value
   */
  compare(value: GInput): Ordering {
    throw CreateAbstractMethodCallError('compare');
  }
}

