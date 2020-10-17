import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';


export abstract class TraitAdd<GValue = unknown, GReturn = unknown> extends Trait {
  add(value: GValue): GReturn {
    throw CreateAbstractMethodCallError('add');
  }
}

export type TInferTraitAddValue<GTraitAdd extends TraitAdd<any, any>> =
  GTraitAdd extends TraitAdd<infer GValue, any>
    ? GValue
    : never;

export type TInferTraitAddReturn<GTraitAdd extends TraitAdd<any, any>> =
  GTraitAdd extends TraitAdd<any, infer GReturn>
    ? GReturn
    : never;

// export abstract class TraitAdd extends Trait {
//   add(value: unknown): unknown {
//     throw CreateAbstractMethodCallError('add');
//   }
// }
//
// export abstract class TraitAddTyped<GValue, GReturn> extends Trait {
//   add(value: GValue): GReturn {
//     throw CreateAbstractMethodCallError('add');
//   }
// }
//
// export type TInferTraitAddValue<GTraitAdd extends TraitAddTyped<any, any>> =
//   GTraitAdd extends TraitAddTyped<infer GValue, any>
//     ? GValue
//     : never;
//
// export type TInferTraitAddReturn<GTraitAdd extends TraitAddTyped<any, any>> =
//   GTraitAdd extends TraitAddTyped<any, infer GReturn>
//     ? GReturn
//     : never;
