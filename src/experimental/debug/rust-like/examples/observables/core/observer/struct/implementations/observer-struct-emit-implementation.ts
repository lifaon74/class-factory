import { Impl } from '../../../../../../core/implementation-decorator';
import { OBSERVER_PRIVATE_CONTEXT, TGenericObserverStruct, TInferObserverStructGValue } from '../observer-struct';
import { TraitObserverEmit } from '../../traits/trait-observer-emit';

@Impl()
export class ImplTraitEmitForObserverStruct<GSelf extends TGenericObserverStruct> extends TraitObserverEmit<GSelf, TInferObserverStructGValue<GSelf>> {
  emit(this: GSelf, value: TInferObserverStructGValue<GSelf>): void {
    this[OBSERVER_PRIVATE_CONTEXT].emit(value);
  }
}
