import { Trait } from '../../../../../core/trait-decorator';
import { TInferTraitGetObservableGObservable, TraitGetObservable } from '../../traits/trait-get-observable';
import { TGenericObservableLike } from '../../observable/observable-types';

@Trait()
export abstract class TraitObservableObserverGetObservable<GSelf, GObservable extends TGenericObservableLike> extends TraitGetObservable<GSelf, GObservable> {
}

export type TInferTraitObservableObserverGetObservableGObservable<GTrait extends TraitObservableObserverGetObservable<any, any>> = TInferTraitGetObservableGObservable<GTrait>;
