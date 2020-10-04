import { AbstractMethodCall } from './abstract-method-call';

export function CreateAbstractMethod(propertyKey?: PropertyKey): () => never {
  return () => {
    AbstractMethodCall(propertyKey);
  };
}
