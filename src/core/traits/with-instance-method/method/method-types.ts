import { IMethodStruct } from './method-struct-definition';
import { TGenericFunction } from '../../../types/misc-types';

export type TMethodFunction<GInstance> = (instance: GInstance, ...args: any[]) => any;

export type TGenericMethodFunction = TMethodFunction<any>;


export type TInferMethodFunctionInstance<GFunction extends TGenericMethodFunction> =
  GFunction extends (instance: infer GInstance, ...args: any[]) => any
    ? GInstance
    : never;

export type TInferMethodFunctionArguments<GFunction extends TGenericMethodFunction> =
  GFunction extends (instance: any, ...args: infer GArguments) => any
    ? GArguments
    : never;

export type TInferMethodFunctionReturn<GFunction extends TGenericMethodFunction> =
  GFunction extends (instance: any, ...args: any[]) => infer GReturn
    ? GReturn
    : never;

// export type TMethodFunctionToFunctionWithThis<GFunction extends TGenericMethodFunction> TODO

/*--*/

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

