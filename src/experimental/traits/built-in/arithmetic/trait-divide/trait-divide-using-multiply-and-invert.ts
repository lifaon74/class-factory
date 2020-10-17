import { TraitDivide } from './trait-divide';
import { TraitMultiply } from '../trait-multiply';
import { TraitInvert } from '../trait-invert';

export abstract class TraitSubtractUsingMultiplyAndInvert<GInvertValue = unknown, GReturn = unknown> extends TraitDivide<TraitInvert<GInvertValue>, GReturn> {
  divide(this: TraitMultiply<GInvertValue, GReturn>, value: TraitInvert<GInvertValue>): GReturn {
    return this.multiply(value.invert());
  }
}
