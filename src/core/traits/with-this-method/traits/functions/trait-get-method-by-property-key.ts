import { TGenericTraitStruct, TInferTraitMethods } from '../trait-types';
import { IMethodStruct } from '../../method/method-struct-definition';
import { TGenericFunction } from '../../../../types/misc-types';


/**
 * Returns the method of 'trait' having 'propertyKey' as propertyKey. Or undefined
 */
export function TraitGetMethodByPropertyKey<GThis extends TGenericTraitStruct, GPropertyKey extends PropertyKey>(
  this: GThis,
  propertyKey: GPropertyKey,
): IMethodStruct<GPropertyKey, TGenericFunction> | undefined { // TODO improve return type
  type GMethods = TInferTraitMethods<GThis>;
  const iterator: Iterator<GMethods> = this.methods[Symbol.iterator]() as Iterator<GMethods>;
  let result: IteratorResult<GMethods>;
  while (!(result = iterator.next()).done) {
    if (result.value.propertyKey === propertyKey) {
      return result.value as unknown as IMethodStruct<GPropertyKey, TGenericFunction>;
    }
  }
  return void 0;
}
