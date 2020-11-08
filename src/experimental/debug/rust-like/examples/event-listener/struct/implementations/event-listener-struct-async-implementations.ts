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
  TEventListenerOnUnsubscribeAsync,
  TEventMap,
  TInferEventMapKeys,
  TListenerCallback,
  TListenerCallbackAsync,
} from '../../../../build-in/event-listener/event-listener-types';
import { TraitEventListenerOnAsync } from '../../../../build-in/event-listener/async/trait-event-listener-on-async/trait-event-listener-on-async';
import { TraitEventListenerDispatchAsync } from '../../../../build-in/event-listener/async/trait-event-listener-dispatch-async/trait-event-listener-dispatch-async';

/** IMPLEMENTATIONS **/

//
// export interface TImplTraitEventListenerOnAsyncForEventListenerStructGSelfConstraint<GSelf extends TGenericEventListenerStruct> extends TGenericEventListenerStruct, TraitEventListenerOn<GSelf, TInferEventListenerStructGEventMap<GSelf>> {
//
// }
//
// @Impl()
// export class ImplTraitEventListenerOnAsyncForEventListenerStruct<GSelf extends TImplTraitEventListenerOnAsyncForEventListenerStructGSelfConstraint<GSelf>> extends TraitEventListenerOnAsync<GSelf, TInferEventListenerStructGEventMap<GSelf>> {
//   onAsync<GEventName extends TInferEventMapKeys<TInferEventListenerStructGEventMap<GSelf>>>(
//     this: GSelf,
//     eventName: GEventName,
//     callback: TListenerCallbackAsync<TInferEventListenerStructGEventMap<GSelf>, GEventName>,
//   ): Promise<TEventListenerOnUnsubscribeAsync> {
//     type GEventMap = TEventMap;
//     const context: IEventListenerPrivateContext<GEventMap> = this[EVENT_LISTENER_PRIVATE_CONTEXT];
//     return context.queue = context.queue
//       .then(() => {
//         const undo: TEventListenerOnUnsubscribe = this.on(eventName, callback);
//         return (): Promise<void> => {
//           return context.queue = context.queue.then(undo);
//         };
//       });
//   }
// }
//
//
//
// @Impl()
// export class ImplTraitEventListenerDispatchAsyncForEventListenerStruct<GSelf extends TGenericEventListenerStruct> extends TraitEventListenerDispatchAsync<GSelf, TInferEventListenerStructGEventMap<GSelf>> {
//   dispatchAsync<GEventName extends TInferEventMapKeys<TInferEventListenerStructGEventMap<GSelf>>>(
//     this: GSelf,
//     eventName: GEventName,
//     value: TInferEventListenerStructGEventMap<GSelf>[GEventName],
//   ): Promise<void> {
//     // type GEventMap = TInferEventListenerStructGEventMap<GSelf>;
//     type GEventMap = TEventMap;
//     const context: IEventListenerPrivateContext<GEventMap> = this[EVENT_LISTENER_PRIVATE_CONTEXT];
//     return context.listeners.has(eventName)
//       ? context.queue = (context.listeners.get(eventName) as IListener[])
//         .reduce((promise: Promise<any>, listener: IListener) => {
//           return promise.then(() => {
//             return listener.callback(value);
//           });
//         }, context.queue)
//       : context.queue;
//     // return context.queue = context.queue
//     //   .then(() => {
//     //     if (context.listeners.has(eventName)) {
//     //       // return (context.listeners.get(eventName) as IListener[])
//     //       const listeners: IListener[] = context.listeners.get(eventName) as IListener[];
//     //       for (let i = 0, l = listeners.length; i < l; i++) {
//     //         listeners[i].callback(value);
//     //       }
//     //     }
//     //   });
//   }
// }
