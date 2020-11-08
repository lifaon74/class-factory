import {
  EVENT_LISTENER_PRIVATE_CONTEXT,
  IEventListenerPrivateContext,
  IEventListenerStruct,
  IListener,
} from '../struct/event-listener-struct';
import {
  ImplTraitEventListenerDispatchForEventListenerStruct,
  ImplTraitEventListenerIsDispatchingForEventListenerStruct,
  ImplTraitEventListenerOnForEventListenerStruct,
} from '../struct/implementations/event-listener-struct-implementations';
import { TEventMap, TInferEventMapKeys } from '../../../build-in/event-listener/event-listener-types';
import { AssembleTraitImplementations } from '../../../core/apply-trait-implementation';
import { CreatePrivateContext } from '../../../../../class-helpers/private/create-private-context';


/** FUNCTIONS **/

export function ConstructEventListener<GEventMap extends TEventMap>(
  instance: IEventListenerStruct<GEventMap>,
): void {
  CreatePrivateContext<IEventListenerPrivateContext<GEventMap>>(
    EVENT_LISTENER_PRIVATE_CONTEXT,
    instance,
    {
      listeners: new Map<TInferEventMapKeys<GEventMap>, IListener[]>(),
      isDispatching: false,
    },
  );
}

/** CLASS **/

export interface IEventListener<GEventMap extends TEventMap> extends IEventListenerStruct<GEventMap>,
  ImplTraitEventListenerIsDispatchingForEventListenerStruct<IEventListener<GEventMap>>,
  ImplTraitEventListenerOnForEventListenerStruct<IEventListener<GEventMap>>,
  ImplTraitEventListenerDispatchForEventListenerStruct<IEventListener<GEventMap>> {
}


export interface IAssembledEventListenerImplementations {
  new<GEventMap extends TEventMap>(): IEventListener<GEventMap>;
}

export const EventListenerImplementationsCollection = [
  ImplTraitEventListenerIsDispatchingForEventListenerStruct,
  ImplTraitEventListenerOnForEventListenerStruct,
  ImplTraitEventListenerDispatchForEventListenerStruct,
];

const AssembledEventListenerImplementations = AssembleTraitImplementations<IAssembledEventListenerImplementations>(EventListenerImplementationsCollection);

export class EventListener<GEventMap extends TEventMap> extends AssembledEventListenerImplementations<GEventMap> implements IEventListener<GEventMap> {
  readonly [EVENT_LISTENER_PRIVATE_CONTEXT]: IEventListenerPrivateContext<GEventMap>;

  constructor() {
    super();
    ConstructEventListener<GEventMap>(this);
  }
}
