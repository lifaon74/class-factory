import { TraitArrayLike } from './trait-array-like';
import { TIterateFunction } from './trait-array-types';

export abstract class TraitArrayEvery<GValue> extends TraitArrayLike<GValue> {
  every(callback: TIterateFunction<GValue, this, boolean>): boolean {
    for (let i: number = 0, l = this.length(); i < l; i++) {
      if (!callback(this.item(i), i, this)) {
        return false;
      }
    }
    return true;
  }
}

