import { Trait } from '../../../../../core/trait-decorator';

@Trait()
export abstract class TraitObservableIsActive<GSelf> {
  abstract isActive(this: GSelf): boolean;
}
