import { Trait } from '../../../core/trait-decorator';

@Trait()
export abstract class TraitToggle<GSelf, GReturn> {
  abstract toggle(this: GSelf, activate?: boolean): GReturn;
}

