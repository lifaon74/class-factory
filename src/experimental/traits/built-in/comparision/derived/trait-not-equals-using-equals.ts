import { mixTraitsWithUnionTyping } from '../../../public';
import { TraitEquals } from '../trait-equals';
import { TraitNotEquals } from '../trait-not-equals';

export abstract class TraitNotEqualsUsingEquals<GInput> extends mixTraitsWithUnionTyping([TraitNotEquals, TraitEquals]) {
  notEquals(this: TraitEquals<GInput>, value: GInput): boolean {
    return !this.equals(value);
  }
}
