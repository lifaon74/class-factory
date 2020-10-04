import { TraitArrayLike } from './trait-array-like';
import { CallTraitMethodOnObject } from '../../trait/call-trait-method';
import { TraitArrayFindIndex } from './trait-array-find-index';
import { TIterateFunction } from './array-types';
import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';

export abstract class TraitArrayMap<GValue> extends TraitArrayLike<GValue> {
  map<GMappedValue>(callback: TIterateFunction<GValue, this, GMappedValue>): TraitArrayLike<GValue> {
    throw CreateAbstractMethodCallError('map');
    // for (let i: number = 0, l = this.length(); i < l; i++) {
    //   if (callback(this.item(i), i, this)) {
    //     return i;
    //   }
    // }
    // return -1;
    // TODO continue here
  }
}

//  map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
// [].map
