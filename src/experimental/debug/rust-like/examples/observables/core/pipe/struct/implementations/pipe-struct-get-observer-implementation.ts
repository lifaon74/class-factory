import { Impl } from '../../../../../../core/implementation-decorator';
import { PIPE_PRIVATE_CONTEXT, TGenericPipeStruct, TInferPipeStructGObserver } from '../pipe-struct';
import { TraitPipeGetObserver } from '../../traits/trait-pipe-get-observer';

@Impl()
export class ImplTraitGetObserverForPipeStruct<GSelf extends TGenericPipeStruct> extends TraitPipeGetObserver<GSelf, TInferPipeStructGObserver<GSelf>> {
  getObserver(this: GSelf): TInferPipeStructGObserver<GSelf> {
    return this[PIPE_PRIVATE_CONTEXT].observer;
  }
}
