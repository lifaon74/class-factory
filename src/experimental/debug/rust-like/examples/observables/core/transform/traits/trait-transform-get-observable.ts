import { Trait } from '../../../../../core/trait-decorator';
import { TInferTraitGetObservableGObservable, TraitGetObservable } from '../../traits/trait-get-observable';
import { TGenericObservableLike } from '../../observable/observable-types';

@Trait()
export abstract class TraitTransformGetObservable<GSelf, GObservable extends TGenericObservableLike> extends TraitGetObservable<GSelf, GObservable> {
}

export type TInferTraitTransformGetObservableGObservable<GTrait extends TraitTransformGetObservable<any, any>> = TInferTraitGetObservableGObservable<GTrait>;
