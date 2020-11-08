import { Impl } from '../../../../../../core/implementation-decorator';
import { TGenericPipeThroughStruct } from '../pipe-through-struct';
import {
  TraitToggleUsingActivateAndDeactivate,
  TTraitToggleUsingActivateAndDeactivateGSelfConstraint,
} from '../../../../../../build-in/activable/trait-toggle/trait-toggle-using-activate-and-deactivate';


export interface ImplTraitToggleForPipeThroughStructGSelfConstraint<GSelf extends TGenericPipeThroughStruct> extends TGenericPipeThroughStruct, TTraitToggleUsingActivateAndDeactivateGSelfConstraint<GSelf> {
}

@Impl()
export class ImplTraitToggleForPipeThroughStruct<GSelf extends ImplTraitToggleForPipeThroughStructGSelfConstraint<GSelf>> extends TraitToggleUsingActivateAndDeactivate<GSelf> {
}
