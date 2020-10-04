import { CreateAbstractMethodCallError } from './create-abstract-method-error';

export function AbstractMethodCall(propertyKey?: PropertyKey): never {
  throw CreateAbstractMethodCallError(propertyKey);
}
