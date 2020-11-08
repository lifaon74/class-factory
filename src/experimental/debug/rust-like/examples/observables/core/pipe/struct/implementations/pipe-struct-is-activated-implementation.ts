import { Impl } from '../../../../../../core/implementation-decorator';
import { PIPE_PRIVATE_CONTEXT, TGenericPipeStruct } from '../pipe-struct';
import { TraitIsActivated } from '../../../../../../build-in/activable/trait-is-activated/trait-is-activated';

@Impl()
export class ImplTraitIsActivatedForPipeStruct<GSelf extends TGenericPipeStruct> extends TraitIsActivated<GSelf> {
  isActivated(this: GSelf): boolean {
    return this[PIPE_PRIVATE_CONTEXT].activated;
  }
}
