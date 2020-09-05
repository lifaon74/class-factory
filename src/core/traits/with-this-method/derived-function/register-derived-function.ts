/**
 * A derived function is simply a function which "extends" another.
 * This is mostly used when an object's method "extends/override" another.
 *
 * @Example:
 * function size(path: string): number { ... }
 * function sizeWithOptions(path: string, options?: TOptions): number { ... } => derived from previous one
 */
import { TGenericFunction } from '../../../types/misc-types';



export const DERIVED_FUNCTION_TO_FUNCTION_MAP = new WeakMap<TGenericFunction, TGenericFunction>(); // [derived, parent]

/**
 * Register 'derivedFunction' as a derived function of 'parentFunction'
 */
export function RegisterDerivedFunction(
  parentFunction: TGenericFunction,
  derivedFunction: TGenericFunction,
): void {
  if (DERIVED_FUNCTION_TO_FUNCTION_MAP.has(derivedFunction)) { // ensures that 'derivedFunction' is not already derived
    if (DERIVED_FUNCTION_TO_FUNCTION_MAP.get(derivedFunction) !== parentFunction) {
      throw new Error(`Derived function already registered as derived from: ${ String(DERIVED_FUNCTION_TO_FUNCTION_MAP.get(derivedFunction)) }`);
    }
  } else if (IsFunctionDerivedFrom(parentFunction, derivedFunction)) { // ensures that 'parentFunction' is not a derived child of 'derivedFunction'
    throw new Error(`Derived function already registered as derived from: ${ String(DERIVED_FUNCTION_TO_FUNCTION_MAP.get(derivedFunction)) }`);
  } else {
    DERIVED_FUNCTION_TO_FUNCTION_MAP.set(derivedFunction, parentFunction);
  }
}

export function IsFunctionDerivedFrom(
  functionToTest: TGenericFunction,
  parentFunction: TGenericFunction,
): boolean {
  while (true) {
    if (functionToTest === parentFunction) {
      return true;
    } else {
      if (DERIVED_FUNCTION_TO_FUNCTION_MAP.has(functionToTest)) {
        functionToTest = DERIVED_FUNCTION_TO_FUNCTION_MAP.get(functionToTest) as TGenericFunction;
      } else {
        return false;
      }
    }
  }
}
