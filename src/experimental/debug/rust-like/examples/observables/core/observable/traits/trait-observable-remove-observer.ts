import { Trait } from '../../../../../core/trait-decorator';
import { TGenericObserverLike } from '../../observer/observer-types';

@Trait()
export abstract class TraitObservableRemoveObserver<GSelf, GObserver extends TGenericObserverLike> {
  abstract removeObserver(this: GSelf, observer: GObserver): GSelf
}

