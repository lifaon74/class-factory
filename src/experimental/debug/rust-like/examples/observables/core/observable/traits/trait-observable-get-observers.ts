import { Trait } from '../../../../../core/trait-decorator';
import { TGenericObserverLike } from '../../observer/observer-types';

@Trait()
export abstract class TraitObservableGetObservers<GSelf, GObserver extends TGenericObserverLike> {
  abstract getObservers(this: GSelf): readonly GObserver[]; // TODO return readonly list
}
