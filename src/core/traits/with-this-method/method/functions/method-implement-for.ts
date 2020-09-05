import { TGenericMethodStruct, TWithImplementedMethod } from '../method-types';
import { MethodOrParentIsImplementedBy } from './method-is-implemented-by';
import { CallFunction } from '../../derived-function/call-function';


/**
 * Implements a method (this) on an object (target)
 *  - ensures that 'target' has not already 'this.propertyKey' or (if present) that target[this.propertyKey] is a parent function of 'functionToImplement'
 *  @method
 */
export function MethodImplementFor<GThis extends TGenericMethodStruct, GTarget>(
  this: GThis,
  target: GTarget,
): TWithImplementedMethod<GTarget, GThis> {
  if ((this.propertyKey in target) && !CallFunction(MethodOrParentIsImplementedBy, this, [target])) {
    throw new Error(`The property '${ String(this.propertyKey) }' is already implemented`);
  } else {
    Object.defineProperty(target, this.propertyKey, {
      value: this.value,
      enumerable: GetMethodStructEnumerable(this.enumerable),
      configurable: GetMethodStructConfigurable(this.configurable),
      writable: GetMethodStructWritable(this.writable),
    });
  }
  return target as TWithImplementedMethod<GTarget, GThis>;
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
