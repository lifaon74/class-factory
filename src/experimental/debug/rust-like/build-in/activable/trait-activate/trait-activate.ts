import { Trait } from '../../../core/trait-decorator';

@Trait()
export abstract class TraitActivate<GSelf, GReturn> {
  abstract activate(this: GSelf): GReturn;
}

export type TInferTraitActivateGReturn<GTrait extends TraitActivate<any, any>> =
  GTrait extends TraitActivate<any, infer GReturn>
    ? GReturn
    : never;

