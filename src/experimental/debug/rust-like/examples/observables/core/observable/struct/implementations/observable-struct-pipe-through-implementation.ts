import { Impl } from '../../../../../../core/implementation-decorator';
import { TGenericObservableLike } from '../../observable-types';
import { TraitObservablePipeThroughSoft } from '../../traits/trait-observable-pipe-through-soft';
import { TraitObservablePipeThrough } from '../../traits/trait-observable-pipe-through';

@Impl()
export class ImplTraitObservablePipeThroughForObservableStruct<GSelf extends TGenericObservableLike> extends TraitObservablePipeThrough<GSelf> {
}
