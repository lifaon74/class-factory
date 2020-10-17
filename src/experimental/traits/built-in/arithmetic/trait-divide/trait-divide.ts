import { CreateAbstractMethodCallError } from '../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../../trait/trait-class';

export abstract class TraitDivide<GValue = unknown, GReturn = unknown> extends Trait {
  divide(value: GValue): GReturn {
    throw CreateAbstractMethodCallError('divide');
  }
}

export type TInferTraitDivideValue<GTraitDivide extends TraitDivide<any, any>> =
  GTraitDivide extends TraitDivide<infer GValue, any>
    ? GValue
    : never;

export type TInferTraitDivideReturn<GTraitDivide extends TraitDivide<any, any>> =
  GTraitDivide extends TraitDivide<any, infer GReturn>
    ? GReturn
    : never;

// export abstract class TraitDivide extends Trait {
//   divide(value: unknown): unknown {
//     throw CreateAbstractMethodCallError('divide');
//   }
// }
