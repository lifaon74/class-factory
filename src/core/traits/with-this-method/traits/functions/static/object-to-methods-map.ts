import { GetOwnPropertyDescriptors, IsNotPrimitivePropertyName } from '../../../../../helpers';
import { MethodDerive } from '../../../method/functions/method-derive';
import { CallFunction } from '../../../derived-function/call-function';
import { TObjectToMethodsMap, TObjectToMethodsUnion } from '../../trait-types';
import { TGenericMethodStruct } from '../../../method/method-types';

/**
 * Returns a Map of MethodStruct built from an object (target)
 */
export function ObjectToMethodsMap<GTarget>(
  target: GTarget,
  parentTraitFunctionsMap: TObjectToMethodsMap<GTarget> = new Map<keyof GTarget, TObjectToMethodsUnion<GTarget>>()
): TObjectToMethodsMap<GTarget> {
  const iterator: Iterator<[keyof GTarget, PropertyDescriptor, Object]> = GetOwnPropertyDescriptors<GTarget>(target);
  let result: IteratorResult<[keyof GTarget, PropertyDescriptor, Object]>;
  while (!(result = iterator.next()).done) {
    const [propertyKey, descriptor]: [keyof GTarget, PropertyDescriptor, Object] = result.value;
    if (IsNotPrimitivePropertyName(propertyKey)) {
      if (typeof descriptor.value === 'function') {

        const method = (
          (parentTraitFunctionsMap.has(propertyKey))
            ? CallFunction(MethodDerive, (parentTraitFunctionsMap.get(propertyKey) as TGenericMethodStruct), [descriptor.value])
            : {
              propertyKey,
              value: descriptor.value,
            }
        ) as TObjectToMethodsUnion<GTarget>;

        Object.assign(method, {
          enumerable: descriptor.enumerable,
          configurable: descriptor.configurable,
          writable: descriptor.writable,
        });

        parentTraitFunctionsMap.set(propertyKey, method);
      } else {
        throw new Error(`Found property which is not a function: '${ String(propertyKey) }'`);
      }
    }
  }
  return parentTraitFunctionsMap;
}
