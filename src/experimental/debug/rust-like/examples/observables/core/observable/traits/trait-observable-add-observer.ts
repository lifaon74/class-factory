import { Trait } from '../../../../../core/trait-decorator';
import { TGenericObserverLike } from '../../observer/observer-types';

@Trait()
export abstract class TraitObservableAddObserver<GSelf, GObserver extends TGenericObserverLike> {
  abstract addObserver(this: GSelf, observer: GObserver): GSelf;
}

export type TInferTraitObservableAddObserverGObserver<GTrait extends TraitObservableAddObserver<any, any>> =
  GTrait extends TraitObservableAddObserver<any, infer GObserver>
    ? GObserver
    : never;
