
export type TToStringFunction<GValue> = (a: GValue) => string;

export type TInferToStringFunctionGGValue<GToStringFunction extends TToStringFunction<any>> =
  GToStringFunction extends TToStringFunction<infer GValue>
    ? GValue
    : never;


export type TToStringMethod<GValue> = {
  toString: TToStringFunction<GValue>;
}
