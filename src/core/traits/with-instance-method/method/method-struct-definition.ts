import { TGenericMethodFunction } from './method-types';

/**
 * Represents a method: a function with a name to associate to an object
 */
export interface IMethodStruct<GPropertyKey extends PropertyKey, GFunction extends TGenericMethodFunction> {
  propertyKey: GPropertyKey;
  value: GFunction;
  enumerable?: boolean;
  configurable?: boolean;
  writable?: boolean;
}

