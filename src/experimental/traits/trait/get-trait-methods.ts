import {
  GetOwnPropertyDescriptors,
  TGetOwnPropertyDescriptorsIteratorType,
} from '../../object-helpers/object-get-own-property-descriptors';
import { IsNotReservedPropertyName } from '../../object-helpers/reserved-property-name';
import { GetPrototypeOf } from '../../object-helpers/object-get-prototype-of';
import { RegisterChildFunction } from '../../function-helpers/register-child-function';
import { Trait } from './trait-class';
import { TGenericMethod } from '../method/method-types';
import { TGenericTrait, TInferTraitMethods, TInferTraitPropertyKeys, TInferTraitPrototype } from './trait-types';
import { IsTrait } from './is-trait';

/** TYPES **/


export type TInferMethodMapFromTrait<GTrait extends TGenericTrait> =
  Map<TInferTraitPropertyKeys<GTrait>, TInferTraitMethods<GTrait>>;

export type TInferTraitMethodsAsArray<GTrait extends TGenericTrait> =
  readonly TInferTraitMethods<GTrait>[];

/*---*/

const GET_TRAIT_METHODS_CACHE = new WeakMap<TGenericTrait, Map<PropertyKey, TGenericMethod>>(); // [trait, methodsMap]

/**
 * Returns a Map of IMethod built from a trait
 */
export function GetTraitMethods<GTrait extends TGenericTrait>(
  trait: GTrait,
): TInferMethodMapFromTrait<GTrait> {
  let cached: Map<PropertyKey, TGenericMethod> | undefined = GET_TRAIT_METHODS_CACHE.get(trait);

  if (cached === void 0) {
    if (IsTrait(trait)) {
      type TPrototype = TInferTraitPrototype<GTrait>;
      type TPropertyKeys = TInferTraitPropertyKeys<GTrait>;
      type TMethods = TInferTraitMethods<GTrait>;
      type TPropertyKeysAndMethodsTuple = [TPropertyKeys, TMethods];

      const methodsMap: TInferMethodMapFromTrait<GTrait> = new Map<TPropertyKeys, TMethods>();
      const proto: TPrototype = trait.prototype as TPrototype;

      // 1) extract own methods
      const iterator: Iterator<TGetOwnPropertyDescriptorsIteratorType<TPrototype>> = GetOwnPropertyDescriptors<TPrototype>(proto);
      let result: IteratorResult<TGetOwnPropertyDescriptorsIteratorType<TPrototype>>;
      while (!(result = iterator.next()).done) {
        const [propertyKey, descriptor]: TGetOwnPropertyDescriptorsIteratorType<TPrototype> = result.value;
        if (IsNotReservedPropertyName(propertyKey)) {
          if (typeof descriptor.value === 'function') {
            methodsMap.set(propertyKey, {
              propertyKey,
              ...descriptor,
            } as TMethods);
          } else {
            throw new Error(`Found property which is not a function: '${ String(propertyKey) }'`);
          }
        }
      }

      // 2) merge with parent proto
      const parent: any = GetPrototypeOf(trait);
      if (parent !== Trait) {
        const parentMethodsMap: TInferMethodMapFromTrait<GTrait> = GetTraitMethods<GTrait>(parent);

        const iterator: Iterator<TPropertyKeysAndMethodsTuple> = parentMethodsMap.entries();
        let result: IteratorResult<TPropertyKeysAndMethodsTuple>;
        while (!(result = iterator.next()).done) {
          const [propertyKey, parentMethod]: TPropertyKeysAndMethodsTuple = result.value;
          const method: TMethods | undefined = methodsMap.get(propertyKey);
          if (method === void 0) {
            methodsMap.set(propertyKey, parentMethod);
          } else {
            RegisterChildFunction(method.value, parentMethod.value);
          }
        }
      }

      cached = methodsMap;
      GET_TRAIT_METHODS_CACHE.set(trait, cached);
    } else {
      console.log(trait);
      throw new TypeError(`Not a trait`);
    }
  }

  return cached as TInferMethodMapFromTrait<GTrait>;
}


/*---*/

const GET_TRAIT_METHODS_AS_ARRAY_CACHE = new WeakMap<TGenericTrait, readonly TGenericMethod[]>(); // [trait, methods]

export function GetTraitMethodsAsArray<GTrait extends TGenericTrait>(
  trait: GTrait,
): TInferTraitMethodsAsArray<GTrait> {
  let cached: readonly TGenericMethod[] | undefined = GET_TRAIT_METHODS_AS_ARRAY_CACHE.get(trait);

  if (cached === void 0) {
    cached = Object.freeze(Array.from(GetTraitMethods<GTrait>(trait).values()));
    GET_TRAIT_METHODS_AS_ARRAY_CACHE.set(trait, cached);
  }

  return cached as TInferTraitMethodsAsArray<GTrait>;
}

