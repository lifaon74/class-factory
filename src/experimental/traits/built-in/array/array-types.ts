import { TraitArrayLike } from './trait-array-like';

export type TIterateFunctionArguments<GValue, GArray extends TraitArrayLike<GValue>> = [value: GValue, index: number, array: GArray];

export type TIterateFunction<GValue, GArray extends TraitArrayLike<GValue>, GReturn> = (...args: TIterateFunctionArguments<GValue, GArray>) => GReturn;
