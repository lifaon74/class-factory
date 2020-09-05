import { IMethodStruct } from '../../method-struct-definition';
import { MethodCall } from '../../functions/method-call';
import { TGenericMethodStruct, TInferMethodFunction } from '../../method-types';
import { TInferFunctionThis } from '../../../../../types/misc-types';


export type TMethodCallMethodName = 'call';

export type TMethodCallTypedFunction<GThis extends TGenericMethodStruct> = <GTarget>(
  this: GThis,
  instance: TInferFunctionThis<TInferMethodFunction<GThis>>,
  ...args: Parameters<TInferMethodFunction<GThis>>
) => ReturnType<TInferMethodFunction<GThis>>;


export type TMethodCallTypedMethodStruct<GThis extends TGenericMethodStruct> = IMethodStruct<TMethodCallMethodName, TMethodCallTypedFunction<GThis>>;

export function CreateMethodCallMethodStruct<GThis extends TGenericMethodStruct>(): TMethodCallTypedMethodStruct<GThis> {
  return {
    propertyKey: 'call',
    value: MethodCall,
  };
}
