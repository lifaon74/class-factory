import { IMethodStruct } from '../../method-struct-definition';
import { MethodImplementFor } from '../../functions/method-implement-for';
import { TGenericMethodStruct, TWithImplementedMethod } from '../../method-types';


export type TMethodImplementForMethodName = 'implementFor';

export type TMethodImplementForTypedFunction<GThis extends TGenericMethodStruct> = <GTarget>(
  this: GThis,
  target: GTarget,
) => TWithImplementedMethod<GTarget, GThis>;


export type TMethodImplementForTypedMethodStruct<GThis extends TGenericMethodStruct> = IMethodStruct<TMethodImplementForMethodName, TMethodImplementForTypedFunction<GThis>>;

export function CreateMethodImplementForMethodStruct<GThis extends TGenericMethodStruct>(): TMethodImplementForTypedMethodStruct<GThis> {
  return {
    propertyKey: 'implementFor',
    value: MethodImplementFor,
  };
}
