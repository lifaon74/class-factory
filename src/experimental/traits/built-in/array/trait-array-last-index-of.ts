import { TraitArrayLike } from './trait-array-like';
import { ResolveArrayEndArgument, ResolveArrayStartArgument } from './array-functions';


export abstract class TraitArrayLastIndexOf<GValue> extends TraitArrayLike<GValue> {
  lastIndexOf(value: GValue, fromIndex?: number): number {
    const length: number = this.length();
    for (let i: number = ResolveArrayEndArgument(fromIndex, -1, length - 1); i >= 0; i++) {
      if (this.item(i) === value) {
        return i;
      }
    }
    return -1;
  }
}
