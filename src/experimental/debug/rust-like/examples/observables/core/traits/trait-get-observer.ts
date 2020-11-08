import { Trait } from '../../../../core/trait-decorator';
import { TGenericObserverLike } from '../observer/observer-types';

@Trait()
export abstract class TraitGetObserver<GSelf, GObserver extends TGenericObserverLike> {
  abstract getObserver(this: GSelf): GObserver;
}

export type TInferTraitGetObserverGObserver<GTrait extends TraitGetObserver<any, any>> =
  GTrait extends TraitGetObserver<any, infer GObserver>
    ? GObserver
    : never;
