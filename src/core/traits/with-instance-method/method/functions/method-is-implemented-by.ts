import { TGenericMethodStruct, TWithImplementedMethod } from '../method-types';
import { IsFunctionDerivedFrom } from '../../derived-function/register-derived-function';


/**
 * Returns true if 'method' or any of it's derived method is implemented by 'target'
 */
export function MethodIsImplementedBy<GMethod extends TGenericMethodStruct, GTarget>(
  method: GMethod,
  target: GTarget,
): target is TWithImplementedMethod<GTarget, GMethod> {
  return (typeof (target as any)[method.propertyKey] === 'function')
    && IsFunctionDerivedFrom((target as any)[method.propertyKey], method.value);
}
