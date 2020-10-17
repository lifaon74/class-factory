import { TraitArrayLike } from './trait-array-like';
import { TReduceFunction } from './array-types';

export abstract class TraitArrayReduceRight<GValue> extends TraitArrayLike<GValue> {
  reduceRight<GReduceValue>(callback: TReduceFunction<GValue, this, GReduceValue>, initialValue: GReduceValue): GReduceValue {
    for (let i: number = this.length() - 1; i >= 0; i--) {
      initialValue = callback(initialValue, this.item(i), i, this);
    }
    return initialValue;
  }
}
