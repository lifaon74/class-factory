import { TraitIsImplementedBy } from '../../core/trait-is-implemented-by';
import { TraitIsActivated } from '../../build-in/activable/trait-is-activated/trait-is-activated';
import { TraitActivate } from '../../build-in/activable/trait-activate/trait-activate';
import { TraitDeactivate } from '../../build-in/activable/trait-deactivate/trait-deactivate';
import { TraitToggle } from '../../build-in/activable/trait-toggle/trait-toggle';

export interface IActivableLike<GReturn> extends TraitIsActivated<any>,
  TraitActivate<any, GReturn>,
  TraitDeactivate<any, GReturn>,
  TraitToggle<any, GReturn> {
}

export function IsActivableLike<GReturn>(value: any): value is IActivableLike<GReturn> {
  return TraitIsImplementedBy(TraitIsActivated, value)
    && TraitIsImplementedBy(TraitActivate, value)
    && TraitIsImplementedBy(TraitDeactivate, value)
    && TraitIsImplementedBy(TraitToggle, value);
}
