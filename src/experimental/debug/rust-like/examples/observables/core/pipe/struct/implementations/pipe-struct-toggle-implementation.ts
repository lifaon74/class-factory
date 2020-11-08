import { Impl } from '../../../../../../core/implementation-decorator';
import { TGenericPipeStruct } from '../pipe-struct';
import {
  TraitToggleUsingActivateAndDeactivate,
  TTraitToggleUsingActivateAndDeactivateGSelfConstraint,
} from '../../../../../../build-in/activable/trait-toggle/trait-toggle-using-activate-and-deactivate';


export interface ImplTraitToggleForPipeStructGSelfConstraint<GSelf extends TGenericPipeStruct> extends TGenericPipeStruct, TTraitToggleUsingActivateAndDeactivateGSelfConstraint<GSelf> {
}

@Impl()
export class ImplTraitToggleForPipeStruct<GSelf extends ImplTraitToggleForPipeStructGSelfConstraint<GSelf>> extends TraitToggleUsingActivateAndDeactivate<GSelf> {
}

