
export type TSubtractFunction<GValueA, GValueB, GReturn> = (a: GValueA, b: GValueB) => GReturn;

export type TInferSubtractFunctionGValueA<GSubtractFunction extends TSubtractFunction<any, any, any>> =
  GSubtractFunction extends TSubtractFunction<infer GValueA, any, any>
    ? GValueA
    : never;

export type TInferSubtractFunctionGValueB<GSubtractFunction extends TSubtractFunction<any, any, any>> =
  GSubtractFunction extends TSubtractFunction<any, infer GValueB, any>
    ? GValueB
    : never;

export type TInferSubtractFunctionGReturn<GSubtractFunction extends TSubtractFunction<any, any, any>> =
  GSubtractFunction extends TSubtractFunction<any, any, infer GReturn>
    ? GReturn
    : never;
