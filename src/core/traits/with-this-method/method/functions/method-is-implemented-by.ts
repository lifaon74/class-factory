import { TGenericMethodStruct, TWithImplementedMethod } from '../method-types';
import { IsFunctionDerivedFrom } from '../../derived-function/register-derived-function';


/**
 * Returns true if a method (this) or any of it's derived methods is implemented by 'target'
 * @method
 */
export function MethodIsImplementedBy<GThis extends TGenericMethodStruct, GTarget>(
  this: GThis,
  target: GTarget,
): target is TWithImplementedMethod<GTarget, GThis> {
  return (typeof target[this.propertyKey] === 'function')
    && IsFunctionDerivedFrom(target[this.propertyKey], this.value);
}

export function MethodOrParentIsImplementedBy<GThis extends TGenericMethodStruct, GTarget>(
  this: GThis,
  target: GTarget,
): target is TWithImplementedMethod<GTarget, GThis> {
  return (typeof target[this.propertyKey] === 'function')
    && IsFunctionDerivedFrom(this.value, target[this.propertyKey]);
}
