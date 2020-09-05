import { MethodIsImplementedBy } from '../../functions/method-is-implemented-by';
import { IMethodStruct } from '../../method-struct-definition';
import { TGenericMethodStruct, TWithImplementedMethod } from '../../method-types';


export type TMethodIsImplementedByMethodName = 'isImplementedBy';

export type TMethodIsImplementedByTypedFunction<GThis extends TGenericMethodStruct> = <GTarget>(
  this: GThis,
  target: GTarget,
) => target is TWithImplementedMethod<GTarget, GThis>;


export type TMethodIsImplementedByTypedMethodStruct<GThis extends TGenericMethodStruct> = IMethodStruct<TMethodIsImplementedByMethodName, TMethodIsImplementedByTypedFunction<GThis>>;

export function CreateMethodIsImplementedByMethodStruct<GThis extends TGenericMethodStruct>(): TMethodIsImplementedByTypedMethodStruct<GThis> {
  return {
    propertyKey: 'isImplementedBy',
    value: MethodIsImplementedBy,
  };
}
