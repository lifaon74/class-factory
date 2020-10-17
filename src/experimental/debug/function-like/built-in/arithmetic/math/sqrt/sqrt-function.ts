export type TSqrtFunction<GValue, GReturn> = (a: GValue) => GReturn;

export type TInferSqrtFunctionGGValue<GSqrtFunction extends TSqrtFunction<any, any>> =
  GSqrtFunction extends TSqrtFunction<infer GValue, any>
    ? GValue
    : never;

export type TInferSqrtFunctionGReturn<GSqrtFunction extends TSqrtFunction<any, any>> =
  GSqrtFunction extends TSqrtFunction<any, infer GReturn>
    ? GReturn
    : never;
