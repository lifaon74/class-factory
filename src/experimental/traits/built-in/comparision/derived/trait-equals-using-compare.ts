import { TraitEquals } from '../trait-equals';
import { Ordering, TraitCompare } from '../trait-compare';
import { mixTraitsWithUnionTyping } from '../../../public';

export abstract class TraitEqualsUsingCompare<GInput> extends mixTraitsWithUnionTyping([TraitEquals, TraitCompare]) {
  equals(this: TraitCompare<GInput>, value: GInput): boolean {
    return this.compare(value) === Ordering.Equal;
  }
}
