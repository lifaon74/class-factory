import { TraitArrayLike } from './trait-array-like';
import { mixTraitsAsInterface } from '../../public';
import { TraitArraySetItem } from './trait-array-set-item';
import { ResolveArrayEndArgument, ResolveArrayStartArgument } from './array-functions';


interface ITraitArrayFillSuperTraits<GValue> extends TraitArrayLike<GValue>, TraitArraySetItem<GValue> {
}

export abstract class TraitArrayFill<GValue> extends mixTraitsAsInterface<ITraitArrayFillSuperTraits<unknown>, void>([TraitArraySetItem, TraitArrayLike]) {
  fill(value: GValue, start?: number, end?: number): this {
    const length: number = this.length();
    let i: number = ResolveArrayStartArgument(start, length);
    const _end: number = ResolveArrayEndArgument(end, i, length);
    for (; i < _end; i++) {
      this.setItem(i, value);
    }
    return this;
  }
}

