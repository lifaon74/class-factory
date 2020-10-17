import { TraitCompare } from '../../comparision/trait-compare';
import { TraitArraySort } from './trait-array-sort';

export abstract class TraitArraySortWithComparableValues<GValue extends TraitCompare<GValue>> extends TraitArraySort<GValue> {
  sort(): this {
    return super.sort((a: GValue, b: GValue) => {
      return a.compare(b);
    });
  }
}
