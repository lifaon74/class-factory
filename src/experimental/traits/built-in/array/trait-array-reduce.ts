import { TraitArrayLike } from './trait-array-like';
import { TReduceFunction } from './array-types';

export abstract class TraitArrayReduce<GValue> extends TraitArrayLike<GValue> {
  reduce<GReduceValue>(callback: TReduceFunction<GValue, this, GReduceValue>, initialValue: GReduceValue): GReduceValue {
    for (let i: number = 0, l = this.length(); i < l; i++) {
      initialValue = callback(initialValue, this.item(i), i, this);
    }
    return initialValue;
  }
}

