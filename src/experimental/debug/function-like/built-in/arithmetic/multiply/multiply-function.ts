
export type TMultiplyFunction<GValueA, GValueB, GReturn> = (a: GValueA, b: GValueB) => GReturn;

export type TInferMultiplyFunctionGValueA<GMultiplyFunction extends TMultiplyFunction<any, any, any>> =
  GMultiplyFunction extends TMultiplyFunction<infer GValueA, any, any>
    ? GValueA
    : never;

export type TInferMultiplyFunctionGValueB<GMultiplyFunction extends TMultiplyFunction<any, any, any>> =
  GMultiplyFunction extends TMultiplyFunction<any, infer GValueB, any>
    ? GValueB
    : never;

export type TInferMultiplyFunctionGReturn<GMultiplyFunction extends TMultiplyFunction<any, any, any>> =
  GMultiplyFunction extends TMultiplyFunction<any, any, infer GReturn>
    ? GReturn
    : never;
