import { IMethodStruct } from './method-struct-definition';
import { TGenericFunction } from '../../types/misc-types';


export type TGenericMethodStruct = IMethodStruct<PropertyKey, TGenericFunction>;

export type TInferMethodPropertyKey<GMethod extends TGenericMethodStruct> =
  GMethod extends IMethodStruct<infer GPropertyKey, TGenericFunction>
    ? GPropertyKey
    : never;


export type TInferMethodFunction<GMethod extends TGenericMethodStruct> =
  GMethod extends IMethodStruct<PropertyKey, infer GFunction>
    ? GFunction
    : never;

export type TInferMethodPropertyKeyAndFunction<GMethod extends TGenericMethodStruct> = GMethod extends IMethodStruct<infer GPropertyKey, infer GFunction>
  ? [GPropertyKey, GFunction]
  : never;

// export type TInferMethodThis<GMethod extends TGenericMethodStruct> = TInferFunctionThis<TInferMethodFunction<GMethod>>;
// export type TInferMethodParameters<GMethod extends TGenericMethodStruct> = Parameters<TInferMethodFunction<GMethod>>;
// export type TInferMethodReturn<GMethod extends TGenericMethodStruct> = ReturnType<TInferMethodFunction<GMethod>>;


export type TMethodToInterface<GMethod extends TGenericMethodStruct> = {
  readonly [P in TInferMethodPropertyKey<GMethod>]: TInferMethodFunction<GMethod>;
};

export type TWithImplementedMethod<GTarget, GMethod extends TGenericMethodStruct> =
  GTarget
  & TMethodToInterface<GMethod>

