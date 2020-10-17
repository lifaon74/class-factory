import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';


export abstract class TraitMultiply<GValue = unknown, GReturn = unknown> extends Trait {
  multiply(value: GValue): GReturn {
    throw CreateAbstractMethodCallError('multiply');
  }
}

export type TInferTraitMultiplyValue<GTraitMultiply extends TraitMultiply<any, any>> =
  GTraitMultiply extends TraitMultiply<infer GValue, any>
    ? GValue
    : never;

export type TInferTraitMultiplyReturn<GTraitMultiply extends TraitMultiply<any, any>> =
  GTraitMultiply extends TraitMultiply<any, infer GReturn>
    ? GReturn
    : never;


// export abstract class TraitMultiply extends Trait {
//   multiply(value: unknown): unknown {
//     throw CreateAbstractMethodCallError('multiply');
//   }
// }
