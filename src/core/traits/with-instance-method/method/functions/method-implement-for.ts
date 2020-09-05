import { TGenericMethodStruct, TWithImplementedMethod } from '../method-types';
import { MethodIsImplementedBy } from './method-is-implemented-by';


/**
 * Implements 'method' on 'target'
 *  - ensures that 'target' has not already 'method.propertyKey' or (if present) that target[method.propertyKey] is a parent function of 'method.value'
 */
export function MethodImplementFor<GMethod extends TGenericMethodStruct, GTarget>(
  method: GMethod,
  target: GTarget,
): TWithImplementedMethod<GTarget, GMethod> {
  if ((method.propertyKey in target) && !MethodIsImplementedBy<GMethod, GTarget>(method, target)) {
    throw new Error(`The property '${ String(method.propertyKey) }' is already implemented`);
  } else {
    Object.defineProperty(target, method.propertyKey, {
      value: method.value,
      enumerable: GetMethodStructEnumerable(method.enumerable),
      configurable: GetMethodStructConfigurable(method.configurable),
      writable: GetMethodStructWritable(method.writable),
    });
  }
  return target as TWithImplementedMethod<GTarget, GMethod>;
}

/* Normalize MethodStruct optional properties */
export function GetMethodStructEnumerable(enumerable?: boolean): boolean {
  return (enumerable === void 0) ? false : enumerable;
}

export function GetMethodStructConfigurable(configurable?: boolean): boolean {
  return (configurable === void 0) ? true : configurable;
}

export function GetMethodStructWritable(writable?: boolean): boolean {
  return (writable === void 0) ? false : writable;
}
