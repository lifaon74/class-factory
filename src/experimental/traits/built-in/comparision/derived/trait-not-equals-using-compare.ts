import { mixTraitsAsUnion } from '../../../public';
import { TraitNotEquals } from '../trait-not-equals';
import { Ordering, TraitCompare } from '../trait-compare';

export abstract class TraitNotEqualsUsingCompare<GInput> extends mixTraitsAsUnion([TraitNotEquals, TraitCompare]) {
  notEquals(this: TraitCompare<GInput>, value: GInput): boolean {
    return this.compare(value) !== Ordering.Equal;
  }
}


