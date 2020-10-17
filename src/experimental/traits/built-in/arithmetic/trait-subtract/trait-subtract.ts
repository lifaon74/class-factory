import { CreateAbstractMethodCallError } from '../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../../trait/trait-class';

export abstract class TraitSubtract<GValue = unknown, GReturn = unknown> extends Trait {
  subtract(value: GValue): GReturn {
    throw CreateAbstractMethodCallError('subtract');
  }
}

// export abstract class TraitSubtract extends Trait {
//   subtract(value: unknown): unknown {
//     throw CreateAbstractMethodCallError('subtract');
//   }
// }
//
// export abstract class TraitSubtractTyped<GValue, GReturn> extends Trait {
//   subtract(value: GValue): GReturn {
//     throw CreateAbstractMethodCallError('subtract');
//   }
// }
