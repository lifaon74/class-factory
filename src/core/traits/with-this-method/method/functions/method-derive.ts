import { TGenericMethodStruct, TInferMethodFunction, TInferMethodPropertyKey } from '../method-types';
import { IMethodStruct } from '../method-struct-definition';
import { RegisterDerivedFunction } from '../../derived-function/register-derived-function';
import { TDerivedFunctionConstraint } from '../../derived-function/derived-function-types';

/**
 * Creates a new MethodStruct derived from this one:
 *  - 'derivedFunction' is marked as derived from this.value
 * @method
 */
export function MethodDerive<GThis extends TGenericMethodStruct, GDerivedFunction extends TDerivedFunctionConstraint<GDerivedFunction, TInferMethodFunction<GThis>>>(
  this: GThis,
  derivedFunction: GDerivedFunction,
): IMethodStruct<TInferMethodPropertyKey<GThis>, GDerivedFunction> {
  RegisterDerivedFunction(this.value, derivedFunction);
  return {
    propertyKey: this.propertyKey as TInferMethodPropertyKey<GThis>,
    value: derivedFunction,
    enumerable: this.enumerable,
    configurable: this.configurable,
    writable: this.writable,
  };
}

