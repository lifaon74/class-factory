import { IMethodStruct } from '../../method-struct-definition';
import { MethodDerive } from '../../functions/method-derive';
import { TGenericMethodStruct, TInferMethodFunction, TInferMethodPropertyKey } from '../../method-types';
import { TDerivedFunctionConstraint } from '../../../derived-function/derived-function-types';
import { IMethod } from '../method-class-definition';
import { CallFunction } from '../../../derived-function/call-function';
import { Method } from '../method-class';


export type TMethodDeriveMethodName = 'derive';

export type TMethodDeriveTypedFunction<GThis extends TGenericMethodStruct> = <GDerivedFunction extends TDerivedFunctionConstraint<GDerivedFunction, TInferMethodFunction<GThis>>>(
  this: GThis,
  derivedFunction: GDerivedFunction,
) => IMethod<TInferMethodPropertyKey<GThis>, GDerivedFunction>;


export type TMethodDeriveTypedMethodStruct<GThis extends TGenericMethodStruct> = IMethodStruct<TMethodDeriveMethodName, TMethodDeriveTypedFunction<GThis>>;

export function CreateMethodDeriveMethodStruct<GThis extends TGenericMethodStruct>(): TMethodDeriveTypedMethodStruct<GThis> {
  return {
    propertyKey: 'derive',
    value: function <GDerivedFunction extends TDerivedFunctionConstraint<GDerivedFunction, TInferMethodFunction<GThis>>>(
      this: GThis,
      derivedFunction: GDerivedFunction,
    ): IMethod<TInferMethodPropertyKey<GThis>, GDerivedFunction> {
      return new Method<TInferMethodPropertyKey<GThis>, GDerivedFunction>(CallFunction(MethodDerive, this, [derivedFunction]) as IMethodStruct<TInferMethodPropertyKey<GThis>, GDerivedFunction>);
    },
  };
}
