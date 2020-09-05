import { TGenericMethodStruct, TInferMethodFunction, TInferMethodPropertyKey } from '../method-types';
import { IMethodStruct } from '../method-struct-definition';
import { TDerivedFunctionConstraint } from '../../derived-function/derived-function-types';

/**
 * Compares a method (this) with  a value (value) and returns true if similar
 * @method
 */
export function MethodEquals<GThis extends TGenericMethodStruct, GDerivedFunction extends TDerivedFunctionConstraint<GDerivedFunction, TInferMethodFunction<GThis>>>(
  this: GThis,
  value: any,
): value is IMethodStruct<TInferMethodPropertyKey<GThis>, TInferMethodFunction<GThis>> {
  return (value !== null)
    && (typeof value === 'object')
    && (value.propertyKey === this.propertyKey)
    && (value.value === this.value);
}

