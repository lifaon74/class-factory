import { TGenericFunction } from '../../../types/misc-types';

/**
 * A derived function is simply a function which "extends" another.
 * This is mostly used when an object's method "extends/override" another.
 *
 * @Example:
 * function size(path: string): number { ... }
 * function sizeWithOptions(path: string, options?: TOptions): number { ... } => derived from previous one
 */


export const DERIVED_FUNCTION_TO_FUNCTION_MAP = new WeakMap<TGenericFunction, TGenericFunction>(); // [derived, parent]
// export const FUNCTION_TO_DERIVED_FUNCTIONS_MAP = new WeakMap<TGenericFunction, TGenericFunction[]>(); // [parent, derived[]]

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
    // if (FUNCTION_TO_DERIVED_FUNCTIONS_MAP.has(parentFunction)) {
    //   (FUNCTION_TO_DERIVED_FUNCTIONS_MAP.get(parentFunction) as TGenericFunction[]).push(derivedFunction);
    // } else {
    //   FUNCTION_TO_DERIVED_FUNCTIONS_MAP.set(parentFunction, [derivedFunction]);
    // }
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

// /**
//  * Returns true if 'functionToTest' or any of it's derived functions is implemented by 'target'
//  */
// export function IsFunctionOrDerivedImplementedBy<GTarget, GPropertyKey extends PropertyKey, GFunction extends TGenericFunction>(
//   target: GTarget,
//   propertyKey: GPropertyKey,
//   functionToTest: GFunction,
// ): target is TWithImplementedFunction<GTarget, GPropertyKey, GFunction> {
//   return (typeof (target as any)[propertyKey] === 'function')
//     && IsFunctionDerivedFrom((target as any)[propertyKey], functionToTest);
//   // && IsFunctionOrDerivedImplementedByAssumingPropertyExists<GTarget, GPropertyKey, GFunction>(target, propertyKey, functionToTest);
// }
//
// // export function IsFunctionOrDerivedImplementedByAssumingPropertyExists<GTarget, GPropertyKey extends PropertyKey, GFunction extends TGenericFunction>(
// //   target: GTarget,
// //   propertyKey: GPropertyKey,
// //   functionToTest: GFunction,
// // ): target is TWithImplementedFunction<GTarget, GPropertyKey, GFunction> {
// //   return ((target as any)[propertyKey] === functionToTest)
// //     || (
// //       FUNCTION_TO_DERIVED_FUNCTIONS_MAP.has(functionToTest)
// //         ? (FUNCTION_TO_DERIVED_FUNCTIONS_MAP.get(functionToTest) as TGenericFunction[])
// //           .some((derivedFunction: TGenericFunction) => IsFunctionOrDerivedImplementedByAssumingPropertyExists<GTarget, GPropertyKey, TGenericFunction>(target, propertyKey, derivedFunction))
// //         : false
// //     );
// // }
//
// /**
//  * Returns true if 'functionToTest' or any of it's parent functions is implemented by 'target'
//  */
// export function IsFunctionOrParentImplementedBy<GTarget, GPropertyKey extends PropertyKey, GFunction extends TGenericFunction>(
//   target: GTarget,
//   propertyKey: GPropertyKey,
//   functionToTest: GFunction,
// ): target is TWithImplementedFunction<GTarget, GPropertyKey, GFunction> {
//   return (typeof (target as any)[propertyKey] === 'function')
//     && IsFunctionDerivedFrom(functionToTest, (target as any)[propertyKey]);
// }
