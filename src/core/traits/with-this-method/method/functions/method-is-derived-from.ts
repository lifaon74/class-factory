import { TGenericMethodStruct } from '../method-types';
import { IsFunctionDerivedFrom } from '../../derived-function/register-derived-function';


/**
 * Returns true if a method (this) is derived from another (target)
 * @method
 */
export function MethodIsDerivedFrom<GThis extends TGenericMethodStruct>(
  this: GThis,
  target: TGenericMethodStruct,
): boolean {
  return IsFunctionDerivedFrom(this.value, target.value);
}

