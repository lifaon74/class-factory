import { Impl } from '../../../../../../core/implementation-decorator';
import {
  OBSERVABLE_OBSERVER_PRIVATE_CONTEXT,
  TGenericObservableObserverStruct,
  TInferObservableObserverStructGObserver,
} from '../observable-observer-struct';
import { TraitObservableObserverGetObserver } from '../../traits/trait-observable-observer-get-observer';

@Impl()
export class ImplTraitGetObserverForObservableObserverStruct<GSelf extends TGenericObservableObserverStruct> extends TraitObservableObserverGetObserver<GSelf, TInferObservableObserverStructGObserver<GSelf>> {
  getObserver(this: GSelf): TInferObservableObserverStructGObserver<GSelf> {
    return this[OBSERVABLE_OBSERVER_PRIVATE_CONTEXT].observer;
  }
}

