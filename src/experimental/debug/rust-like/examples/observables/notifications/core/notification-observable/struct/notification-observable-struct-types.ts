import { INotificationObservableStruct } from './notification-observable-struct';
import { TEventMap } from '../../../../../../build-in/event-listener/event-listener-types';
import { TraitEventListenerDispatch } from '../../../../../../build-in/event-listener/sync/trait-event-listener-dispatch/trait-event-listener-dispatch';
import { IObservableEventMap } from '../../../../core/observable/observable-types';
import { TInferNotificationObserversFromEventMap } from '../notification-observable-types';

export interface INotificationObservableStructWithDispatch<GEventMap extends TEventMap> extends INotificationObservableStruct<GEventMap>,
  TraitEventListenerDispatch<any, IObservableEventMap<TInferNotificationObserversFromEventMap<GEventMap>>> {
}

export type TGenericNotificationObservableStructWithDispatch = INotificationObservableStructWithDispatch<any>;
