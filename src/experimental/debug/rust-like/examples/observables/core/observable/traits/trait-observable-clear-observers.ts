import { Trait } from '../../../../../core/trait-decorator';

@Trait()
export abstract class TraitObservableClearObservers<GSelf> {
  abstract clearObservers(this: GSelf): GSelf;
}
