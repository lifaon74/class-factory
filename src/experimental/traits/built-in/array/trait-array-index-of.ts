import { TraitArrayLike } from './trait-array-like';
import { ResolveArrayStartArgument } from './array-functions';


export abstract class TraitArrayIndexOf<GValue> extends TraitArrayLike<GValue> {
  indexOf(value: GValue, fromIndex?: number): number {
    const length: number = this.length();
    for (let i: number = ResolveArrayStartArgument(fromIndex, length); i < length; i++) {
      if (this.item(i) === value) {
        return i;
      }
    }
    return -1;
  }
}
