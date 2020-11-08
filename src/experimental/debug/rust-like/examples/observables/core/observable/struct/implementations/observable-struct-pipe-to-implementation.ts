import { Impl } from '../../../../../../core/implementation-decorator';
import { TGenericObservableLike } from '../../observable-types';
import { TraitObservablePipeTo } from '../../traits/trait-observable-pipe-to';

@Impl()
export class ImplTraitObservablePipeToForObservableStruct<GSelf extends TGenericObservableLike> extends TraitObservablePipeTo<GSelf> {
}
