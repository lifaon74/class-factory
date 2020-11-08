import { Impl } from '../../../../../../core/implementation-decorator';
import { PIPE_PRIVATE_CONTEXT, TGenericPipeStruct, TInferPipeStructGObservable } from '../pipe-struct';
import { TraitPipeGetObservable } from '../../traits/trait-pipe-get-observable';


@Impl()
export class ImplTraitGetObservableForPipeStruct<GSelf extends TGenericPipeStruct> extends TraitPipeGetObservable<GSelf, TInferPipeStructGObservable<GSelf>> {
  getObservable(this: GSelf): TInferPipeStructGObservable<GSelf> {
    return this[PIPE_PRIVATE_CONTEXT].observable;
  }
}
