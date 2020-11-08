import { Impl } from '../../../../../../core/implementation-decorator';
import { TGenericObservableLike } from '../../observable-types';
import { TraitObservablePipeThroughSoft } from '../../traits/trait-observable-pipe-through-soft';

@Impl()
export class ImplTraitObservablePipeThroughSoftForObservableStruct<GSelf extends TGenericObservableLike> extends TraitObservablePipeThroughSoft<GSelf> {
}
