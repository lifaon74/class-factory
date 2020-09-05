import {
  TGenericMethodStruct, TInferMethodFunction, TInferMethodFunctionArguments, TInferMethodFunctionInstance,
  TInferMethodFunctionReturn
} from '../method-types';
import { MethodIsImplementedBy } from './method-is-implemented-by';

/**
 * Calls 'method' with 'instance' as this
 *  - if 'instance' implements 'method' or a derived one, calls directly the object's property (as function)
 *  - else, calls 'method.value'
 * INFO: used to call the real implementation of a method on 'instance', or fallback to 'method' if not implemented
 */
export function MethodCall<GMethod extends TGenericMethodStruct>(
  method: GMethod,
  instance: TInferMethodFunctionInstance<TInferMethodFunction<GMethod>>,
  ...args: TInferMethodFunctionArguments<TInferMethodFunction<GMethod>>
): TInferMethodFunctionReturn<TInferMethodFunction<GMethod>> {
  if (MethodIsImplementedBy<GMethod, TInferMethodFunctionInstance<TInferMethodFunction<GMethod>>>(method, instance)) {
    return instance[method.propertyKey](instance, ...args);
  } else {
    return method.value.call(instance, instance, ...args);
  }
  // return method.value.call(instance, ...args);
}
