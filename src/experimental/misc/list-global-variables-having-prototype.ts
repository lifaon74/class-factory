import { GetPropertyDescriptors } from '../object-helpers/object-get-property-descriptors';
import { HasOwnProperty } from '../object-helpers/object-has-own-property';
import { THavingPrototype } from '../types/class-types';

/**
 * Returns the list of all global variables of type function (having a prototype)
 */
export function * ListGlobalVariablesHavingPrototype(): Generator<[PropertyKey, THavingPrototype]> {
  const iterator: Iterator<[propertyKey: keyof any, descriptor: PropertyDescriptor, target: any]> = GetPropertyDescriptors(globalThis);
  let result: IteratorResult<[propertyKey: keyof any, descriptor: PropertyDescriptor, target: any]>;
  while (!(result = iterator.next()).done) {
    const globalVariable: any = result.value[1].value;
    if (
      (globalVariable !== void 0)
      && (globalVariable !== null)
      && (result.value[0] !== 'constructor')
      && HasOwnProperty(globalVariable, 'prototype')
    ) {
      yield [result.value[0], globalVariable];
    }
  }
}
