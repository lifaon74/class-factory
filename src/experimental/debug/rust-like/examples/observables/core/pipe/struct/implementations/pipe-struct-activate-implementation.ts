import { Impl } from '../../../../../../core/implementation-decorator';
import { PIPE_PRIVATE_CONTEXT, TGenericPipeStruct, TPipePrivateContextFromGSelf } from '../pipe-struct';
import { TraitActivate } from '../../../../../../build-in/activable/trait-activate/trait-activate';

@Impl()
export class ImplTraitActivateForPipeStruct<GSelf extends TGenericPipeStruct> extends TraitActivate<GSelf, GSelf> {
  activate(this: GSelf): GSelf {
    const context: TPipePrivateContextFromGSelf<GSelf> = this[PIPE_PRIVATE_CONTEXT];
    if (!context.activated) {
      context.activated = true;
      context.observable.addObserver(context.observer);
    }
    return this;
  }
}