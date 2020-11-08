import { Trait } from '../../../../../core/trait-decorator';
import { TInferTraitGetObserverGObserver, TraitGetObserver } from '../../traits/trait-get-observer';
import { TGenericObserverLike } from '../../observer/observer-types';

@Trait()
export abstract class TraitTransformGetObserver<GSelf, GObserver extends TGenericObserverLike> extends TraitGetObserver<GSelf, GObserver> {
}

export type TInferTraitTransformGetObserverGObserver<GTrait extends TraitTransformGetObserver<any, any>> = TInferTraitGetObserverGObserver<GTrait>;
