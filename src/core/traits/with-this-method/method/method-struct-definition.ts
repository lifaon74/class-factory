import { TGenericFunction } from '../../../types/misc-types';

export interface IMethodDescriptor {
  enumerable?: boolean;
  configurable?: boolean;
  writable?: boolean;
}

/**
 * Represents a method: a function with a name to associate to an object
 */
export interface IMethodStruct<GPropertyKey extends PropertyKey, GFunction extends TGenericFunction> extends IMethodDescriptor {
  propertyKey: GPropertyKey;
  value: GFunction;
}

