import {
  NOTIFICATION_PRIVATE_CONTEXT,
  TGenericNotificationStruct,
  TInferNotificationStructGName,
} from '../notification-struct';
import { Impl } from '../../../../../../../core/implementation-decorator';
import { TraitNotificationGetName } from '../../traits/trait-notification-get-name';


@Impl()
export class ImplTraitGetNameForNotificationStruct<GSelf extends TGenericNotificationStruct> extends TraitNotificationGetName<GSelf, TInferNotificationStructGName<GSelf>> {
  getName(this: GSelf): TInferNotificationStructGName<GSelf> {
    return this[NOTIFICATION_PRIVATE_CONTEXT].name;
  }
}
