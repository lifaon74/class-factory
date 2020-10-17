export type TNegateFunction<GValue, GReturn> = (a: GValue) => GReturn;

export type TInferNegateFunctionGGValue<GNegateFunction extends TNegateFunction<any, any>> =
  GNegateFunction extends TNegateFunction<infer GValue, any>
    ? GValue
    : never;

export type TInferNegateFunctionGReturn<GNegateFunction extends TNegateFunction<any, any>> =
  GNegateFunction extends TNegateFunction<any, infer GReturn>
    ? GReturn
    : never;
