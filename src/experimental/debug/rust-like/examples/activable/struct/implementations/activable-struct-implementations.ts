import { Impl } from '../../../../core/implementation-decorator';
import {
  ACTIVABLE_PRIVATE_CONTEXT,
  IActivableStruct,
  TGenericActivableStruct,
  TInferActivableStructGReturn,
} from '../activable-struct';
import { TraitActivate } from '../../../../build-in/activable/trait-activate/trait-activate';
import { TraitIsActivated } from '../../../../build-in/activable/trait-is-activated/trait-is-activated';
import { TraitDeactivate } from '../../../../build-in/activable/trait-deactivate/trait-deactivate';
import {
  TraitToggleUsingActivateAndDeactivate,
  TTraitToggleUsingActivateAndDeactivateGSelfConstraint,
} from '../../../../build-in/activable/trait-toggle/trait-toggle-using-activate-and-deactivate';

/** IMPLEMENTATIONS **/

@Impl()
export class ImplTTraitIsActivatedForActivableStruct<GSelf extends TGenericActivableStruct> extends TraitIsActivated<GSelf> {
  isActivated(this: GSelf): boolean {
    return this[ACTIVABLE_PRIVATE_CONTEXT].isActivated;
  }
}

@Impl()
export class ImplTraitActivateForActivableStruct<GSelf extends TGenericActivableStruct> extends TraitActivate<GSelf, TInferActivableStructGReturn<GSelf>> {
  activate(this: GSelf): TInferActivableStructGReturn<GSelf> {
    this[ACTIVABLE_PRIVATE_CONTEXT].isActivated = true;
    return this[ACTIVABLE_PRIVATE_CONTEXT].activate();
  }
}

@Impl()
export class ImplTraitDeactivateForActivableStruct<GSelf extends TGenericActivableStruct> extends TraitDeactivate<GSelf, TInferActivableStructGReturn<GSelf>> {
  deactivate(this: GSelf): TInferActivableStructGReturn<GSelf> {
    this[ACTIVABLE_PRIVATE_CONTEXT].isActivated = false;
    return this[ACTIVABLE_PRIVATE_CONTEXT].deactivate();
  }
}


export interface TImplTraitToggleForActivableStructGSelfConstraint<GSelf extends TGenericActivableStruct> extends TGenericActivableStruct, TTraitToggleUsingActivateAndDeactivateGSelfConstraint<GSelf> {
}

@Impl()
export class ImplTraitToggleForActivableStruct<GSelf extends TImplTraitToggleForActivableStructGSelfConstraint<GSelf>> extends TraitToggleUsingActivateAndDeactivate<GSelf> {
}
