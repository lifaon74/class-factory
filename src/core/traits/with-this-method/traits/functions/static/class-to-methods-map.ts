import { ObjectPrototypeChainToMethodsMap } from './object-prototype-chain-to-methods-map';
import { TClassToMethodsMap, TClassTrait, TInferClassTraitInstance } from '../../trait-types';

/**
 * Returns a Map of MethodStruct built from an object (target)
 */
export function ClassToMethodsMap<GClass extends TClassTrait<any>>(
  _class: GClass
): TClassToMethodsMap<GClass> {
  return ObjectPrototypeChainToMethodsMap<TInferClassTraitInstance<GClass>>(_class.prototype);
}


