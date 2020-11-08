import { AssembleTraitImplementations } from '../../../core/apply-trait-implementation';
import { CreatePrivateContext } from '../../../../../class-helpers/private/create-private-context';
import {
  ACTIVABLE_PRIVATE_CONTEXT,
  IActivablePrivateContext,
  IActivableStruct,
  TActivableActivateFunction,
  TActivableDeactivateFunction,
} from '../struct/activable-struct';
import {
  ImplTraitActivateForActivableStruct,
  ImplTraitDeactivateForActivableStruct,
  ImplTraitToggleForActivableStruct,
  ImplTTraitIsActivatedForActivableStruct,
} from '../struct/implementations/activable-struct-implementations';


/** CLASS **/

export interface IActivable<GReturn> extends IActivableStruct<GReturn>,
  ImplTTraitIsActivatedForActivableStruct<IActivable<GReturn>>,
  ImplTraitActivateForActivableStruct<IActivable<GReturn>>,
  ImplTraitDeactivateForActivableStruct<IActivable<GReturn>>,
  ImplTraitToggleForActivableStruct<IActivable<GReturn>> {
}


export interface IAssembledActivableImplementations {
  new<GReturn>(): IActivable<GReturn>;
}

export const ActivableImplementationsCollection = [
  ImplTTraitIsActivatedForActivableStruct,
  ImplTraitActivateForActivableStruct,
  ImplTraitDeactivateForActivableStruct,
  ImplTraitToggleForActivableStruct,
];

const AssembledActivableImplementations = AssembleTraitImplementations<IAssembledActivableImplementations>(ActivableImplementationsCollection);

export class Activable<GReturn> extends AssembledActivableImplementations<GReturn> implements IActivable<GReturn> {
  readonly [ACTIVABLE_PRIVATE_CONTEXT]: IActivablePrivateContext<GReturn>;

  constructor(
    activate: TActivableActivateFunction<GReturn>,
    deactivate: TActivableDeactivateFunction<GReturn>,
  ) {
    super();
    CreatePrivateContext<IActivablePrivateContext<GReturn>>(
      ACTIVABLE_PRIVATE_CONTEXT,
      this,
      {
        isActivated: false,
        activate,
        deactivate,
      },
    );
  }
}
