/**
 * Creates an abstract method
 * INFO: DECORATOR
 */
export function AbstractMethod(): PropertyDecorator {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(target, propertyKey)
  ): void | PropertyDescriptor => {

    if (descriptor === void 0) {
      return {
        configurable: false,
        writable: false,
        value: () => {
          AbstractMethodCall(propertyKey);
        }
      };
    } else {
      throw new TypeError(`@AbstractProperty: the property '${ String(propertyKey) }' should not be defined.`);
    }
  };
}

export function CreateAbstractMethodCallError(propertyKey?: PropertyKey): Error {
  return (propertyKey === void 0)
   ? new Error(`Cannot call an abstract method`)
   : new Error(`Cannot call the abstract method '${ String(propertyKey) }'`);
}

export function AbstractMethodCall(propertyKey?: PropertyKey): never {
  throw CreateAbstractMethodCallError(propertyKey);
}
