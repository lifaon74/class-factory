import { TraitNegate } from '../trait-negate';
import { TraitAdd } from '../trait-add';
import { TraitSubtract } from './trait-subtract';

export abstract class TraitSubtractUsingAddAndNegate<GNegateValue = unknown, GReturn = unknown> extends TraitSubtract<TraitNegate<GNegateValue>, GReturn> {
  subtract(this: TraitAdd<GNegateValue, GReturn>, value: TraitNegate<GNegateValue>): GReturn {
    return this.add(value.negate());
  }
}

// export abstract class TraitSubtractUsingAddAndNegate<GValue extends TraitNegate<unknown> = TraitNegate<unknown>, GReturn = unknown> extends TraitSubtract {
//   subtract(this: TraitAdd, value: GValue): unknown {
//     return this.add(value.negate());
//   }
// }

// export abstract class TraitSubtractUsingAddAndNegate extends TraitSubtract {
//   subtract(this: TraitAdd, value: TraitNegate): unknown {
//     return this.add(value.negate());
//   }
// }
