import { TraitNegate } from '../trait-negate';
import { TraitAdd } from '../trait-add';

export type TInferTraitNegateInput<GTraitNegate extends TraitNegate<any, any>> =
  GTraitNegate extends TraitNegate<infer GInput, any>
    ? GInput
    : never;

export type TInferTraitNegateOutput<GTraitNegate extends TraitNegate<any, any>> =
  GTraitNegate extends TraitNegate<any, infer GOutput>
    ? GOutput
    : never;

export abstract class TraitSubUsingAddAndNegate<GTraitNegate extends TraitNegate<any, any>> extends TraitAdd<TInferTraitNegateInput<GTraitNegate>, TInferTraitNegateOutput<GTraitNegate>> {
  sub(value: GTraitNegate): TInferTraitNegateOutput<GTraitNegate> {
    return this.add(value.negate());
  }
}
