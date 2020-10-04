import { IsChildFunctionOf } from '../../function-helpers/register-child-function';
import { TGenericMethod, TWithImplementedMethod } from './method-types';
import { IsNativeFunction } from '../../function-helpers/is-native-function';

export type TImplementMethodOnObjectOverride = 'none' | 'native' | 'force';
export type TImplementMethodOnObjectMode = 'skip' | 'define' | 'throw';

/**
 * Implements 'method' on 'target'
 */
export function ImplementMethodOnObject<GMethod extends TGenericMethod, GTarget>(
  method: GMethod,
  target: GTarget,
  override: TImplementMethodOnObjectOverride = 'none',
): TWithImplementedMethod<GTarget, GMethod> {
  const propertyKey: PropertyKey = method.propertyKey;
  let mode: TImplementMethodOnObjectMode;

  if (override === 'force') {
    mode = 'define';
  } else if (propertyKey in target) { // object has already this property key
    const fnc: any = target[propertyKey];
    if (typeof fnc === 'function') { // object's property is a function
      if ((override === 'native') && IsNativeFunction(fnc)) {
        mode = 'define';
      } else {
        if (IsChildFunctionOf(method.value, target[propertyKey])) { // the method is a child of the current object's property => override
          mode = 'define';
        } else if (IsChildFunctionOf(target[propertyKey], method.value)) { // if the method is a parent or the object's property, we consider it is already implemented (=> do nothing)
          mode = 'skip';
        } else { // else => cannot override
          mode = 'throw';
        }
      }
    } else { // not a function => cannot override
      mode = 'throw';
    }
  } else {
    mode = 'define';
  }

  switch (mode) {
    case 'skip':
      break;
    case 'define':
      Object.defineProperty(target, propertyKey, method);
      break;
    case 'throw':
      throw new Error(`The property '${ String(propertyKey) }' is already implemented`);
    default:
      throw new TypeError(`Invalid mode '${ String(propertyKey) }'`);
  }

  return target as TWithImplementedMethod<GTarget, GMethod>;
}
