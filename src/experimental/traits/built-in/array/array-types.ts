import { TraitArrayLike } from './trait-array-like';

export type TReduceFunctionArguments<GValue, GArray extends TraitArrayLike<GValue>, GReduceValue> = [previousValue: GReduceValue, currentValue: GValue, currentIndex: number, array: GArray];

export type TReduceFunction<GValue, GArray extends TraitArrayLike<GValue>, GReduceValue> = (...args: TReduceFunctionArguments<GValue, GArray, GReduceValue>) => GReduceValue;

// TODO migrate with ITERATOR ones
export type TIterateFunctionArguments<GValue, GArray extends TraitArrayLike<GValue>> = [value: GValue, index: number, array: GArray];

// TODO migrate with ITERATOR ones
export type TIterateFunction<GValue, GArray extends TraitArrayLike<GValue>, GReturn> = (...args: TIterateFunctionArguments<GValue, GArray>) => GReturn;

export type TCompareFunction<GValue> = (a: GValue, b: GValue) => number;
