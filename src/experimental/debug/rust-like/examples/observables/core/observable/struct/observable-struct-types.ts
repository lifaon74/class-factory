import { TraitEventListenerDispatch } from '../../../../../build-in/event-listener/sync/trait-event-listener-dispatch/trait-event-listener-dispatch';
import { IObservableStruct } from './observable-struct';
import { IObservableEventMap } from '../observable-types';
import { TGenericObserverLike } from '../../observer/observer-types';

export interface IObservableStructWithDispatch<GObserver extends TGenericObserverLike> extends IObservableStruct<GObserver>,
  TraitEventListenerDispatch<any, IObservableEventMap<GObserver>> {
}

export type TGenericObservableStructWithDispatch = IObservableStructWithDispatch<any>;
