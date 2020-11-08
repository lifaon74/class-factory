import { Impl } from '../../../../../../core/implementation-decorator';
import {
  OBSERVABLE_OBSERVER_PRIVATE_CONTEXT,
  TGenericObservableObserverStruct,
  TInferObservableObserverStructGObserver,
} from '../observable-observer-struct';
import { TraitObservableObserverGetObservable } from '../../traits/trait-observable-observer-get-observable';

@Impl()
export class ImplTraitGetObservableForObservableObserverStruct<GSelf extends TGenericObservableObserverStruct> extends TraitObservableObserverGetObservable<GSelf, TInferObservableObserverStructGObserver<GSelf>> {
  getObservable(this: GSelf): TInferObservableObserverStructGObserver<GSelf> {
    return this[OBSERVABLE_OBSERVER_PRIVATE_CONTEXT].observable;
  }
}

