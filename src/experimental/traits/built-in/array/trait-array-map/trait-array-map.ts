import { TraitArrayLike } from '../trait-array-like';
import { TIterateFunction } from '../array-types';
import { CreateAbstractMethodCallError } from '../../../../class-helpers/abstract/create-abstract-method-error';

export abstract class TraitArrayMap<GValue> extends TraitArrayLike<GValue> {
  map<GMappedValue>(callback: TIterateFunction<GValue, this, GMappedValue>): TraitArrayLike<GMappedValue> {
    throw CreateAbstractMethodCallError('map');
  }
}
