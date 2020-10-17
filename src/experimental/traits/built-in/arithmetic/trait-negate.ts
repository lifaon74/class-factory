import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitNegate<GReturn = unknown> extends Trait {
  negate(): GReturn {
    throw CreateAbstractMethodCallError('negate');
  }
}

export type TInferTraitNegateReturn<GTraitNegate extends TraitNegate<any>> =
  GTraitNegate extends TraitNegate<infer GReturn>
    ? GReturn
    : never;

// export abstract class TraitNegate extends Trait {
//   negate(): unknown {
//     throw CreateAbstractMethodCallError('negate');
//   }
// }
//
// export abstract class TraitNegateTyped<GReturn> extends Trait {
//   negate(): GReturn  {
//     throw CreateAbstractMethodCallError('negate');
//   }
// }
//
// export type TInferTraitNegateReturn<GTraitNegate extends TraitNegateTyped<any>> =
//   GTraitNegate extends TraitNegateTyped<infer GReturn>
//     ? GReturn
//     : never;

