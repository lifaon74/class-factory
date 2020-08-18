import { TGenericFunction } from '../types/misc-types';

/**
 * A derived function is simply a function which "extends" another.
 * This is mostly used when an object's method "extends/override" another.
 *
 * @Example:
 * function size(path: string): number { ... }
 * function sizeWithOptions(path: string, options?: TOptions): number { ... } => derived from previous one
 */

export type TWithImplementedFunction<GTarget, GPropertyKey extends PropertyKey, GFunction extends TGenericFunction> =
  GTarget
  & Record<GPropertyKey, GFunction>;

export const DERIVED_FUNCTION_TO_FUNCTION_MAP = new WeakMap<TGenericFunction, TGenericFunction>(); // [derived, parent]
export const FUNCTION_TO_DERIVED_FUNCTIONS_MAP = new WeakMap<TGenericFunction, TGenericFunction[]>(); // [parent, derived[]]

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
    if (FUNCTION_TO_DERIVED_FUNCTIONS_MAP.has(parentFunction)) {
      (FUNCTION_TO_DERIVED_FUNCTIONS_MAP.get(parentFunction) as TGenericFunction[]).push(derivedFunction);
    } else {
      FUNCTION_TO_DERIVED_FUNCTIONS_MAP.set(parentFunction, [derivedFunction]);
    }
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

export interface IImplementForOptions {
  enumerable?: boolean;
  configurable?: boolean;
  writable?: boolean;
}

export function GetImplementForOptionsEnumerable(options?: IImplementForOptions): boolean {
  return ((options === void 0) || (options.enumerable === void 0)) ? false : options.enumerable;
}

export function GetImplementForOptionsConfigurable(options?: IImplementForOptions): boolean {
  return ((options === void 0) || (options.configurable === void 0)) ? true : options.configurable;
}

export function GetImplementForOptionsWritable(options?: IImplementForOptions): boolean {
  return ((options === void 0) || (options.writable === void 0)) ? false : options.writable;
}

/**
 * Set 'functionToImplement' as a method of 'target'
 *  - ensures that 'target' hasn't 'propertyKey' or target[propertyKey] is a parent function of 'functionToImplement'
 */
export function ImplementFunctionFor<GTarget, GPropertyKey extends PropertyKey, GFunction extends TGenericFunction>(
  target: GTarget,
  propertyKey: GPropertyKey,
  functionToImplement: GFunction,
  options?: IImplementForOptions
): TWithImplementedFunction<GTarget, GPropertyKey, GFunction> {
  if ((propertyKey in target) && !IsFunctionOrParentImplementedBy(target, propertyKey, functionToImplement)) {
    throw new Error(`The property '${ String(propertyKey) }' is already implemented`);
  } else {
    Object.defineProperty(target, propertyKey, {
      value: functionToImplement,
      enumerable: GetImplementForOptionsEnumerable(options),
      configurable: GetImplementForOptionsConfigurable(options),
      writable: GetImplementForOptionsWritable(options),
    });
  }
  return target as any;
}

/**
 * Returns true if 'functionToTest' or any of it's derived functions is implemented by 'target'
 */
export function IsFunctionOrDerivedImplementedBy<GTarget, GPropertyKey extends PropertyKey, GFunction extends TGenericFunction>(
  target: GTarget,
  propertyKey: GPropertyKey,
  functionToTest: GFunction,
): target is TWithImplementedFunction<GTarget, GPropertyKey, GFunction> {
  return (propertyKey in target)
    && IsFunctionOrDerivedImplementedByAssumingPropertyExists<GTarget, GPropertyKey, GFunction>(target, propertyKey, functionToTest);
}

export function IsFunctionOrDerivedImplementedByAssumingPropertyExists<GTarget, GPropertyKey extends PropertyKey, GFunction extends TGenericFunction>(
  target: GTarget,
  propertyKey: GPropertyKey,
  functionToTest: GFunction,
): target is TWithImplementedFunction<GTarget, GPropertyKey, GFunction> {
  return ((target as any)[propertyKey] === functionToTest)
    || (
      FUNCTION_TO_DERIVED_FUNCTIONS_MAP.has(functionToTest)
        ? (FUNCTION_TO_DERIVED_FUNCTIONS_MAP.get(functionToTest) as TGenericFunction[])
          .some((derivedFunction: TGenericFunction) => IsFunctionOrDerivedImplementedByAssumingPropertyExists<GTarget, GPropertyKey, TGenericFunction>(target, propertyKey, derivedFunction))
        : false
    );
}

/**
 * Returns true if 'functionToTest' or any of it's parent functions is implemented by 'target'
 */
export function IsFunctionOrParentImplementedBy<GTarget, GPropertyKey extends PropertyKey, GFunction extends TGenericFunction>(
  target: GTarget,
  propertyKey: GPropertyKey,
  functionToTest: GFunction,
): target is TWithImplementedFunction<GTarget, GPropertyKey, GFunction> {
  return (propertyKey in target)
    && IsFunctionDerivedFrom(functionToTest, (target as any)[propertyKey]);
}
