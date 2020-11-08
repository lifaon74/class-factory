import {
  NOTIFICATION_OBSERVER_PRIVATE_CONTEXT,
  TGenericNotificationObserverStruct,
  TInferNotificationObserverStructGName,
} from '../notification-observer-struct';
import { Impl } from '../../../../../../../core/implementation-decorator';
import { TraitNotificationObserverGetName } from '../../traits/trait-notification-observer-get-name';


@Impl()
export class ImplTraitGetNameForNotificationObserverStruct<GSelf extends TGenericNotificationObserverStruct> extends TraitNotificationObserverGetName<GSelf, TInferNotificationObserverStructGName<GSelf>> {
  getName(this: GSelf): TInferNotificationObserverStructGName<GSelf> {
    return this[NOTIFICATION_OBSERVER_PRIVATE_CONTEXT].name;
  }
}
