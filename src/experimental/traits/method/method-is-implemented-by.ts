import { TGenericMethod, TWithImplementedMethod } from './method-types';
import { IsChildFunctionOf } from '../../function-helpers/register-child-function';

/**
 * Returns true if 'method' or any of its child's methods is implemented by 'target'
 */
export function MethodOrChildIsImplementedBy<GMethod extends TGenericMethod, GTarget>(
  method: GMethod,
  target: GTarget,
): target is TWithImplementedMethod<GTarget, GMethod> {
  return (typeof target[method.propertyKey] === 'function')
    && IsChildFunctionOf(target[method.propertyKey], method.value);
}

/**
 * Returns true if 'method' or any of it's parent's methods is implemented by 'target'
 */
export function MethodOrParentIsImplementedBy<GMethod extends TGenericMethod, GTarget>(
  method: GMethod,
  target: GTarget,
): target is TWithImplementedMethod<GTarget, GMethod> {
  return (typeof target[method.propertyKey] === 'function')
    && IsChildFunctionOf(method.value, target[method.propertyKey]);
}
