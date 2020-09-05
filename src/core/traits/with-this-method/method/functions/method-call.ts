import { TGenericMethodStruct, TInferMethodFunction } from '../method-types';
import { MethodIsImplementedBy } from './method-is-implemented-by';
import { CallFunction } from '../../derived-function/call-function';
import { TInferFunctionThis } from '../../../../types/misc-types';

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
  if (CallFunction(MethodIsImplementedBy, this, [instance])) {
    return instance[this.propertyKey](...args);
  } else {
    return this.value.apply(instance, args);
  }
  // return this.value.call(instance, ...args);
}
