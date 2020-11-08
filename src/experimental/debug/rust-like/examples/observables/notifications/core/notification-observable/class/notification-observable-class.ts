import {
  INotificationObservablePrivateContext,
  INotificationObservableStruct,
  NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT,
} from '../struct/notification-observable-struct';
import { CreatePrivateContext } from '../../../../../../../../class-helpers/private/create-private-context';
import {
  AssembleTraitImplementations,
  OverrideTraitImplementations,
} from '../../../../../../core/apply-trait-implementation';
import { ImplTraitAddObserverForNotificationObservableStruct } from '../struct/implementations/notification-observable-struct-add-observer-implementation';
import {
  ConstructObservable,
  IObservable, ObservableImplementationsCollection,
} from '../../../../core/observable/class/observable-class';
import { TEventMap, TInferEventMapKeys } from '../../../../../../build-in/event-listener/event-listener-types';
import {
  TInferNotificationObserversFromEventMap,
  TNotificationObservableCreateFunction,
} from '../notification-observable-types';



/** CONSTRUCTOR **/

export function ConstructNotificationObservable<GEventMap extends TEventMap>(
  instance: INotificationObservable<GEventMap>,
  create?: TNotificationObservableCreateFunction<GEventMap>,
): void {
  ConstructObservable<TInferNotificationObserversFromEventMap<GEventMap>>(instance, create);

  CreatePrivateContext<INotificationObservablePrivateContext<GEventMap>>(
    NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT,
    instance,
    {
      observersMap: new Map<TInferEventMapKeys<GEventMap>, TInferNotificationObserversFromEventMap<GEventMap>[]>(),
    },
  );
}

/** CLASS **/

export interface INotificationObservable<GEventMap extends TEventMap> extends INotificationObservableStruct<GEventMap>,
  ImplTraitAddObserverForNotificationObservableStruct<INotificationObservable<GEventMap>>,
  Omit<IObservable<TInferNotificationObserversFromEventMap<GEventMap>>, 'addObserver'> { // TODO create a type to handle this case
}

export interface IAssembledNotificationObservableImplementations {
  new<GEventMap extends TEventMap>(): INotificationObservable<GEventMap>;
}

export const NotificationObservableImplementationsCollection = OverrideTraitImplementations(ObservableImplementationsCollection, [
  ImplTraitAddObserverForNotificationObservableStruct,
]);

const AssembledNotificationObservableImplementations = AssembleTraitImplementations<IAssembledNotificationObservableImplementations>(NotificationObservableImplementationsCollection);


export class NotificationObservable<GEventMap extends TEventMap> extends AssembledNotificationObservableImplementations<GEventMap> implements INotificationObservable<GEventMap> {
  readonly [NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT]: INotificationObservablePrivateContext<GEventMap>;

  constructor(
    create?: TNotificationObservableCreateFunction<GEventMap>,
  ) {
    super();
    ConstructNotificationObservable<GEventMap>(this, create);
  }
}
