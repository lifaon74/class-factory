import { TraitArrayLike } from './trait-array-like';
import { TIterateFunction } from './array-types';


export abstract class TraitArrayFindIndex<GValue> extends TraitArrayLike<GValue> {
  findIndex(callback: TIterateFunction<GValue, this, boolean>): number {
    for (let i: number = 0, l = this.length(); i < l; i++) {
      if (callback(this.item(i), i, this)) {
        return i;
      }
    }
    return -1;
  }
}
