import { TraitArrayLike } from './trait-array-like';
import { CallTraitMethodOnObject } from '../../trait/call-trait-method';
import { TraitArrayIndexOf } from './trait-array-index-of';


export abstract class TraitArrayIncludes<GValue> extends TraitArrayLike<GValue> {
  includes(value: GValue, fromIndex?: number): boolean {
    return (CallTraitMethodOnObject(TraitArrayIndexOf, 'indexOf', this, [value, fromIndex]) !== -1);
  }
}
