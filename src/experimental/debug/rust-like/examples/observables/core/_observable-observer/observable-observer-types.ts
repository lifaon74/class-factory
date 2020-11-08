import { TraitIsImplementedBy } from '../../../../core/trait-is-implemented-by';
import { TGenericObservableLike } from '../observable/observable-types';
import {
  TInferTraitObservableObserverGetObservableGObservable,
  TraitObservableObserverGetObservable,
} from './traits/trait-observable-observer-get-observable';
import {
  TInferTraitObservableObserverGetObserverGObserver,
  TraitObservableObserverGetObserver,
} from './traits/trait-observable-observer-get-observer';
import { TGenericObserverLike } from '../observer/observer-types';

export interface IObservableObserverLike<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike> extends TraitObservableObserverGetObservable<IObservableObserverLike<GObserver, GObservable>, GObservable>,
  TraitObservableObserverGetObserver<IObservableObserverLike<GObserver, GObservable>, GObserver> {
}

export type TGenericObservableObserverLike = IObservableObserverLike<TGenericObserverLike, TGenericObservableLike>;

export type TInferObservableObserverLikeGObserver<GObservableObserverLike extends TGenericObservableObserverLike> = TInferTraitObservableObserverGetObserverGObserver<GObservableObserverLike>;
export type TInferObservableObserverLikeGObservable<GObservableObserverLike extends TGenericObservableObserverLike> = TInferTraitObservableObserverGetObservableGObservable<GObservableObserverLike>;

export function IsObservableObserverLike<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike>(value: any): value is IObservableObserverLike<GObserver, GObservable> {
  return TraitIsImplementedBy(TraitObservableObserverGetObservable, value)
    && TraitIsImplementedBy(TraitObservableObserverGetObserver, value);
}
