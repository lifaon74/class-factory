import { Impl } from '../../../../core/implementation-decorator';
import {
  EVENT_LISTENER_PRIVATE_CONTEXT,
  IEventListenerPrivateContext,
  IListener,
  TGenericEventListenerStruct,
  TInferEventListenerStructGEventMap,
} from '../event-listener-struct';

import { TraitEventListenerOn } from '../../../../build-in/event-listener/sync/trait-event-listener-on/trait-event-listener-on';
import { TraitEventListenerDispatch } from '../../../../build-in/event-listener/sync/trait-event-listener-dispatch/trait-event-listener-dispatch';
import {
  TEventListenerOnUnsubscribe,
  TEventMap,
  TInferEventMapKeys,
  TListenerCallback,
} from '../../../../build-in/event-listener/event-listener-types';
import { TraitEventListenerIsDispatching } from '../../../../build-in/event-listener/sync/trait-event-listener-is-dispatching/trait-event-listener-is-dispatching';
import { GenerateIsDispatchingError, GetListenersHavingName } from '../functions/event-listener-struct-functions';

/** IMPLEMENTATIONS **/

@Impl()
export class ImplTraitEventListenerIsDispatchingForEventListenerStruct<GSelf extends TGenericEventListenerStruct> extends TraitEventListenerIsDispatching<GSelf, TInferEventListenerStructGEventMap<GSelf>> {
  isDispatching(this: GSelf): boolean {
    return this[EVENT_LISTENER_PRIVATE_CONTEXT].isDispatching;
  }
}

@Impl()
export class ImplTraitEventListenerOnForEventListenerStruct<GSelf extends TGenericEventListenerStruct> extends TraitEventListenerOn<GSelf, TInferEventListenerStructGEventMap<GSelf>> {
  on<GEventName extends TInferEventMapKeys<TInferEventListenerStructGEventMap<GSelf>>>(
    this: GSelf,
    eventName: GEventName,
    callback: TListenerCallback<TInferEventListenerStructGEventMap<GSelf>, GEventName>,
  ): TEventListenerOnUnsubscribe {
    // type GEventMap = TInferEventListenerStructGEventMap<GSelf>;
    type GEventMap = TEventMap;
    const context: IEventListenerPrivateContext<GEventMap> = this[EVENT_LISTENER_PRIVATE_CONTEXT];
    if (context.isDispatching) {
      throw GenerateIsDispatchingError();
    } else {
      const listeners: IListener[] = GetListenersHavingName(context.listeners, eventName);

      const listener: IListener = { callback };

      listeners.push(listener);

      return (): void => {
        if (context.isDispatching) {
          throw GenerateIsDispatchingError();
        } else {
          for (let i = 0, l = listeners.length; i < l; i++) {
            if (listeners[i] === listener) {
              listeners.splice(i, 1);
            }
          }
        }
      };
    }
  }
}

@Impl()
export class ImplTraitEventListenerDispatchForEventListenerStruct<GSelf extends TGenericEventListenerStruct> extends TraitEventListenerDispatch<GSelf, TInferEventListenerStructGEventMap<GSelf>> {
  dispatch<GEventName extends TInferEventMapKeys<TInferEventListenerStructGEventMap<GSelf>>>(
    this: GSelf,
    eventName: GEventName,
    value: TInferEventListenerStructGEventMap<GSelf>[GEventName],
  ): void {
    // type GEventMap = TInferEventListenerStructGEventMap<GSelf>;
    type GEventMap = TEventMap;
    const context: IEventListenerPrivateContext<GEventMap> = this[EVENT_LISTENER_PRIVATE_CONTEXT];
    if (context.isDispatching) {
      throw GenerateIsDispatchingError();
    } else {
      if (context.listeners.has(eventName)) {
        context.isDispatching = true;
        const listeners: IListener[] = (context.listeners.get(eventName) as IListener[]);
        for (let i = 0, l = listeners.length; i < l; i++) {
          listeners[i].callback(value);
        }
        context.isDispatching = false;
      }
    }

  }
}
