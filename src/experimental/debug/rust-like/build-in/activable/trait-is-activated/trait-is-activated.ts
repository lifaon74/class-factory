import { Trait } from '../../../core/trait-decorator';

@Trait()
export abstract class TraitIsActivated<GSelf> {
  abstract isActivated(this: GSelf): boolean;
}

