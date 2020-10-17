import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';
import { ReflectTraitOnGlobalVariables } from '../../trait/trait-functions';
import { TraitToString } from '../others/trait-to-string';
import { ImplementTraitOnObject } from '../../trait/implement-trait-on-object';
import { ImplementMethodOnObject } from '../../method/implement-method-on-object';

export const enum Ordering {
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

/*---*/

export abstract class TraitCompareNumber extends TraitCompare<number> {
  compare(this: number, value: number): Ordering {
    return compareNumber(this, value);
  }
}

export function AddTraitCompareToNumber() {
  ImplementTraitOnObject(TraitCompareNumber, Number.prototype);
}
