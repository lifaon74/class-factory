import { TGenericFunction } from '../types/function-types';
import { GetPrototypeChainPropertyDescriptor } from '../object-helpers/object-get-prototype-chain-method';
import { RegisterChildFunction } from './register-child-function';


/**
 * Explores the prototype chain of an object, and registers its different methods (with 'propertyKey') as child and parent
 */
export function RegisterChildFunctionForObjectPrototypeChain<GTarget, GPropertyKey extends keyof GTarget>(
  target: GTarget,
  propertyKey: GPropertyKey,
  parentFunction?: TGenericFunction,
): void {
  const descriptors: TypedPropertyDescriptor<GTarget[GPropertyKey]>[] = Array.from(
    GetPrototypeChainPropertyDescriptor(target, propertyKey),
    ([descriptor]) => descriptor
  );
  for (let i: number = descriptors.length - 1; i >= 0; i--) {
    const childFunction: any = descriptors[i].value;
    if (typeof childFunction === 'function') {
      if (parentFunction !== void 0) {
        RegisterChildFunction(childFunction, parentFunction);
      }
      parentFunction = childFunction;
    } else {
      console.log(childFunction);
      throw new Error(`Found property which is not a function: '${ String(propertyKey) }'`);
    }
  }
}
