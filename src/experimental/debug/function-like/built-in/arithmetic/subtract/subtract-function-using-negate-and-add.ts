import { TInferNegateFunctionGReturn, TNegateFunction } from '../negate/negate-function';
import { TAddFunction } from '../add/add-function';

export type TSubtractUsingNegateAndAddFunctionsCollection<GValueA, GValueB, GReturn, GNegateFunction extends TNegateFunction<GValueB, any>> = {
  negate: GNegateFunction,
  add: TAddFunction<GValueA, TInferNegateFunctionGReturn<GNegateFunction>, GReturn>,
};

export function subtractUsingNegateAndAdd<GValueA, GValueB, GReturn, GNegateFunction extends TNegateFunction<GValueB, any>>(
  a: GValueA,
  b: GValueB,
  functions: TSubtractUsingNegateAndAddFunctionsCollection<GValueA, GValueB, GReturn, GNegateFunction>,
): GReturn {
  return functions.add(a, functions.negate(b));
}


export function subtractUsingNegateAndAddRaw<GValueA, GValueB, GReturn, GNegateFunction extends TNegateFunction<GValueB, any>>(
  a: GValueA,
  b: GValueB,
  negate: GNegateFunction,
  add: TAddFunction<GValueA, TInferNegateFunctionGReturn<GNegateFunction>, GReturn>,
): GReturn {
  return add(a, negate(b));
}

