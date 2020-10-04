import { TraitArrayLike } from './trait-array-like';
import { TIterateFunction } from './trait-array-types';

export abstract class TraitArrayForEach<GValue> extends TraitArrayLike<GValue> {
  // TODO: handle 'index' arg
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  forEach(callback: TIterateFunction<GValue, this, void>): void {
    for (let i: number = 0, l = this.length(); i < l; i++) {
      callback(this.item(i), i, this);
    }
  }
}

