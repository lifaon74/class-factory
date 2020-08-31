import { TInferFunctionThis } from '../../../types/misc-types';
import { TGenericMethodStruct, TInferMethodFunction, TMethodToInterface } from '../method-types';
import { IMethodStruct } from '../method-struct-definition';
import { TInferTraitFunctionFunction } from '../../bcp/classes/trait-function/trait-function-class';
import { MethodIsImplementedBy } from './method-is-implemented-by';

/**
 * Calls a method (this) on 'instance'
 *  - if 'instance' implements this method or a derived one, calls directly the object's property (as function)
 *  - else, calls this method
 * INFO: this is used to call the real implementation of a method on 'instance', or fallback to this method if not implemented
 * @method
 */
export function MethodCall<GThis extends TGenericMethodStruct>(
  this: GThis,
  instance: TInferFunctionThis<TInferMethodFunction<GThis>>,
  ...args: Parameters<TInferMethodFunction<GThis>>
): ReturnType<TInferMethodFunction<GThis>> {
  if (MethodIsImplementedBy.call(this, instance)) {
    return (instance as any)[this.propertyKey](...args);
  } else {
    return this.value.apply(instance, args);
  }
  // return this.value.call(instance, ...args);
}
