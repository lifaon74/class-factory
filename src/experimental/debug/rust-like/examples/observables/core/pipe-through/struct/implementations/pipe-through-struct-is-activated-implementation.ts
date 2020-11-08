import { Impl } from '../../../../../../core/implementation-decorator';
import { PIPE_THROUGH_PRIVATE_CONTEXT, TGenericPipeThroughStruct } from '../pipe-through-struct';
import { TraitIsActivated } from '../../../../../../build-in/activable/trait-is-activated/trait-is-activated';


@Impl()
export class ImplTraitIsActivatedForPipeThroughStruct<GSelf extends TGenericPipeThroughStruct> extends TraitIsActivated<GSelf> {
  isActivated(this: GSelf): boolean {
    return this[PIPE_THROUGH_PRIVATE_CONTEXT].undo !== null;
  }
}
