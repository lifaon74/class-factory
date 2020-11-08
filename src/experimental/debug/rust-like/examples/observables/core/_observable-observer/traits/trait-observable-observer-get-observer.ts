import { Trait } from '../../../../../core/trait-decorator';
import { TInferTraitGetObserverGObserver, TraitGetObserver } from '../../traits/trait-get-observer';
import { TGenericObserverLike } from '../../observer/observer-types';

@Trait()
export abstract class TraitObservableObserverGetObserver<GSelf, GObserver extends TGenericObserverLike> extends TraitGetObserver<GSelf, GObserver> {
}

export type TInferTraitObservableObserverGetObserverGObserver<GTrait extends TraitObservableObserverGetObserver<any, any>> = TInferTraitGetObserverGObserver<GTrait>;
