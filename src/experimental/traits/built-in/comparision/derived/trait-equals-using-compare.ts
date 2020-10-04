import { TraitEquals } from '../trait-equals';
import { Ordering, TraitCompare } from '../trait-compare';
import { mixTraitsAsUnion } from '../../../public';

export abstract class TraitEqualsUsingCompare<GInput> extends mixTraitsAsUnion([TraitEquals, TraitCompare]) {
  equals(this: TraitCompare<GInput>, value: GInput): boolean {
    return this.compare(value) === Ordering.Equal;
  }
}
