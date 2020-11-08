import { Trait } from '../../../../../core/trait-decorator';
import { TInferTraitGetObserverGObserver, TraitGetObserver } from '../../traits/trait-get-observer';
import { TGenericObserverLike } from '../../observer/observer-types';

@Trait()
export abstract class TraitPipeGetObserver<GSelf, GObserver extends TGenericObserverLike> extends TraitGetObserver<GSelf, GObserver> {
}

export type TInferTraitPipeGetObserverGValue<GTrait extends TraitPipeGetObserver<any, any>> = TInferTraitGetObserverGObserver<GTrait>;
