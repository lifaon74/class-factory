export function CreateAbstractMethodCallError(propertyKey?: PropertyKey): Error {
  return (propertyKey === void 0)
    ? new Error(`Call on abstract method`)
    : new Error(`Call on abstract method '${ String(propertyKey) }'`);
}

