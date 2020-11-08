import { TGenericObserverLike } from '../observer/observer-types';
import { TraitIsImplementedBy } from '../../../../core/trait-is-implemented-by';
import { TraitObservableIsActive } from './traits/trait-observable-is-active';
import {
  TInferTraitObservableAddObserverGObserver,
  TraitObservableAddObserver,
} from './traits/trait-observable-add-observer';
import { TraitObservableRemoveObserver } from './traits/trait-observable-remove-observer';
import { TraitEventListenerDispatch } from '../../../../build-in/event-listener/sync/trait-event-listener-dispatch/trait-event-listener-dispatch';
import { TGenericObservableStruct, TInferObservableStructGObserver } from './struct/observable-struct';

export interface IObservableLike<GObserver extends TGenericObserverLike> extends TraitObservableIsActive<any>,
  TraitObservableAddObserver<any, GObserver>,
  TraitObservableRemoveObserver<any, GObserver> {
}


export type TGenericObservableLike = IObservableLike<any>;

export type TInferObservableLikeGObserver<GObservableLike extends TGenericObservableLike> = TInferTraitObservableAddObserverGObserver<GObservableLike>;

export function IsObservableLike<GObserver extends TGenericObserverLike>(value: any): value is IObservableLike<GObserver> {
  return TraitIsImplementedBy(TraitObservableIsActive, value)
    && TraitIsImplementedBy(TraitObservableAddObserver, value)
    && TraitIsImplementedBy(TraitObservableRemoveObserver, value);
}


/*-----*/


export interface IObservableEventMap<GObserver extends TGenericObserverLike> {
  'add-observer': GObserver;
  'remove-observer': GObserver;
  'active': void;
  'inactive': void;
}


