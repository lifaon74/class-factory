import { GetPrototypesChain, IsNotPrimitivePrototype } from '../../../../../helpers';
import { ObjectToMethodsMap } from './object-to-methods-map';
import { TObjectToMethodsMap, TObjectToMethodsUnion } from '../../trait-types';

/**
 * Returns a Map of MethodStruct built from an object (target), and its prototype chain
 */
export function ObjectPrototypeChainToMethodsMap<GTarget>(
  target: GTarget,
): TObjectToMethodsMap<GTarget> {
  const prototypes = Array.from(GetPrototypesChain(target)).filter(IsNotPrimitivePrototype).reverse();
  const parentTraitFunctionsMap = new Map<keyof GTarget, TObjectToMethodsUnion<GTarget>>();
  for (let i = 0, li = prototypes.length; i < li; i++) {
    ObjectToMethodsMap<GTarget>(prototypes[i], parentTraitFunctionsMap);
  }
  return parentTraitFunctionsMap;
}
