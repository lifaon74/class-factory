import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitRemainder<GValue = unknown, GReturn = unknown> extends Trait {
  remainder(value: GValue): GReturn {
    throw CreateAbstractMethodCallError('remainder');
  }
}

export type TInferTraitRemainderValue<GTraitRemainder extends TraitRemainder<any, any>> =
  GTraitRemainder extends TraitRemainder<infer GValue, any>
    ? GValue
    : never;

export type TInferTraitRemainderReturn<GTraitRemainder extends TraitRemainder<any, any>> =
  GTraitRemainder extends TraitRemainder<any, infer GReturn>
    ? GReturn
    : never;

// export abstract class TraitRemainder extends Trait {
//   remainder(value: unknown): unknown {
//     throw CreateAbstractMethodCallError('remainder');
//   }
// }
