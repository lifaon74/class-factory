import { MethodEquals } from '../../functions/method-equals';
import { IMethodStruct } from '../../method-struct-definition';
import { TGenericMethodStruct, TInferMethodFunction, TInferMethodPropertyKey } from '../../method-types';


export type TMethodEqualsMethodName = 'equals';

export type TMethodEqualsTypedFunction<GThis extends TGenericMethodStruct> = (
  this: GThis,
  value: any,
) => value is IMethodStruct<TInferMethodPropertyKey<GThis>, TInferMethodFunction<GThis>>;


export type TMethodEqualsTypedMethodStruct<GThis extends TGenericMethodStruct> = IMethodStruct<TMethodEqualsMethodName, TMethodEqualsTypedFunction<GThis>>;

export function CreateMethodEqualsMethodStruct<GThis extends TGenericMethodStruct>(): TMethodEqualsTypedMethodStruct<GThis> {
  return {
    propertyKey: 'equals',
    value: MethodEquals,
  };
}
