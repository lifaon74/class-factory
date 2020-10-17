
export type TDivideFunction<GValueA, GValueB, GReturn> = (a: GValueA, b: GValueB) => GReturn;

export type TInferDivideFunctionGValueA<GDivideFunction extends TDivideFunction<any, any, any>> =
  GDivideFunction extends TDivideFunction<infer GValueA, any, any>
    ? GValueA
    : never;

export type TInferDivideFunctionGValueB<GDivideFunction extends TDivideFunction<any, any, any>> =
  GDivideFunction extends TDivideFunction<any, infer GValueB, any>
    ? GValueB
    : never;

export type TInferDivideFunctionGReturn<GDivideFunction extends TDivideFunction<any, any, any>> =
  GDivideFunction extends TDivideFunction<any, any, infer GReturn>
    ? GReturn
    : never;
