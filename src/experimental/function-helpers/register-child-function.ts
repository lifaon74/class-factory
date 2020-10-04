import { TGenericFunction } from '../types/function-types';


/**
 * A super function is a function "extended" by another
 * - 'parent function' the function extended
 * - 'child function' the function which extends the 'parent function'
 * This is mostly used when an object's method "extends/override" another.
 *
 * @Example:
 * function size(path: string): number { ... } => parent function
 * function sizeWithOptions(path: string, options?: TOptions): number { ... } => child function of previous one
 */

export const CHILD_FUNCTION_TO_FUNCTION_MAP = new WeakMap<TGenericFunction, TGenericFunction>(); // [child, parent]

/**
 * Register 'childFunction' as a child function of 'parentFunction'
 */
export function RegisterChildFunction(
  childFunction: TGenericFunction,
  parentFunction: TGenericFunction,
  // isNotComingFromPrimitiveParent: boolean = true
): void {
  if (CHILD_FUNCTION_TO_FUNCTION_MAP.has(childFunction)) { // ensures that 'childFunction' is not already derived
    if (CHILD_FUNCTION_TO_FUNCTION_MAP.get(childFunction) !== parentFunction) {
      if (/*isNotComingFromPrimitiveParent || */!IsChildFunctionOf(childFunction, parentFunction)) {
        console.log('child function', childFunction);
        console.log('parent function', parentFunction);
        console.log('current parent function', CHILD_FUNCTION_TO_FUNCTION_MAP.get(childFunction));
        throw new Error(`The provided child function is already registered as child of: ${ String(CHILD_FUNCTION_TO_FUNCTION_MAP.get(childFunction)) }`);
      }
    }
  } else if (IsChildFunctionOf(parentFunction, childFunction)) { // ensures that 'parentFunction' is not a child of 'childFunction'
    console.log('child function', childFunction);
    console.log('parent function', parentFunction);
    throw new Error(`The provided parent function is a child of: ${ String(CHILD_FUNCTION_TO_FUNCTION_MAP.get(childFunction)) }`);
  } else {
    CHILD_FUNCTION_TO_FUNCTION_MAP.set(childFunction, parentFunction);
  }
}

export function IsChildFunctionOf(
  functionToTest: TGenericFunction,
  parentFunction: TGenericFunction,
): boolean {
  while (true) {
    if (functionToTest === parentFunction) {
      return true;
    } else {
      if (CHILD_FUNCTION_TO_FUNCTION_MAP.has(functionToTest)) {
        functionToTest = CHILD_FUNCTION_TO_FUNCTION_MAP.get(functionToTest) as TGenericFunction;
      } else {
        return false;
      }
    }
  }
}
