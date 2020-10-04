import { TraitArrayLike } from './trait-array-like';
import { CallTraitMethodOnObject } from '../../trait/call-trait-method';
import { TraitArrayFindIndex } from './trait-array-find-index';
import { TIterateFunction } from './array-types';

export abstract class TraitArrayFind<GValue> extends TraitArrayLike<GValue> {
  find(callback: TIterateFunction<GValue, this, boolean>): GValue | undefined {
    const index: number = CallTraitMethodOnObject(TraitArrayFindIndex, 'findIndex', this, [callback as any]);
    return (index === -1)
      ? void 0
      : this.item(index);
  }
}
