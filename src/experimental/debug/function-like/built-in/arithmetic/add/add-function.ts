
export type TAddFunction<GValueA, GValueB, GReturn> = (a: GValueA, b: GValueB) => GReturn;

export type TInferAddFunctionGValueA<GAddFunction extends TAddFunction<any, any, any>> =
  GAddFunction extends TAddFunction<infer GValueA, any, any>
    ? GValueA
    : never;

export type TInferAddFunctionGValueB<GAddFunction extends TAddFunction<any, any, any>> =
  GAddFunction extends TAddFunction<any, infer GValueB, any>
    ? GValueB
    : never;

export type TInferAddFunctionGReturn<GAddFunction extends TAddFunction<any, any, any>> =
  GAddFunction extends TAddFunction<any, any, infer GReturn>
    ? GReturn
    : never;

export type TAddMethod<GValueA, GValueB, GReturn> = {
  add: TAddFunction<GValueA, GValueB, GReturn>;
}
