import {
  GetOwnPropertyDescriptors, GetPrototypesChain, IsNotPrimitivePropertyName, IsNotPrimitivePrototype
} from '../helpers';
import { TGenericFunction } from '../types/misc-types';
import { TGenericTraitFunction, TraitFunction } from './trait-function-class';
import { Trait } from './trait-class';

/**
 * Helpers function to generate Trait or TraitFunction
 */

export interface TClassTrait<GInstance> {
  prototype: GInstance;
}

export type TInferClassTraitInstance<GClass extends TClassTrait<any>> =
  GClass extends TClassTrait<infer GInstance>
    ? GInstance
    : never;

export type TTraitFunctionsFromObject<GObject> = {
  [GKey in keyof GObject]: GObject[GKey] extends (this: infer GThis, ...args: infer GArgs) => infer GReturn
    ? TraitFunction<GKey, (this: GThis, ...args: GArgs) => GReturn>
    : never;
}[keyof GObject];

export type TTraitFunctionsMapFromObject<GObject> = Map<keyof GObject, TTraitFunctionsFromObject<GObject>>;

export type TTraitFunctionsFromClass<GClass extends TClassTrait<any>> =
  TTraitFunctionsFromObject<TInferClassTraitInstance<GClass>>;

export type TTraitFunctionsMapFromClass<GClass extends TClassTrait<any>> = TTraitFunctionsMapFromObject<TInferClassTraitInstance<GClass>>;

export type TTraitFromInterface<GInterface> = Trait<TTraitFunctionsFromObject<GInterface>>;

export type TTraitFromClass<GClass extends TClassTrait<any>> = Trait<TTraitFunctionsFromClass<GClass>>;


// const a: TTraitFunctionsFromObject<{ a(): number; b(): string; }>;

/**
 * Returns a Map of TraitFunction built from an object
 */
export function TraitFunctionsFromObject<GTarget>(
  target: GTarget,
  parentTraitFunctionsMap: TTraitFunctionsMapFromObject<GTarget> = new Map<keyof GTarget, TTraitFunctionsFromObject<GTarget>>()
): TTraitFunctionsMapFromObject<GTarget> {
  const iterator: Iterator<[keyof GTarget, PropertyDescriptor, Object]> = GetOwnPropertyDescriptors<GTarget>(target);
  let result: IteratorResult<[keyof GTarget, PropertyDescriptor, Object]>;
  while (!(result = iterator.next()).done) {
    const [propertyKey, descriptor]: [keyof GTarget, PropertyDescriptor, Object] = result.value;
    if (IsNotPrimitivePropertyName(propertyKey)) {
      if (typeof descriptor.value === 'function') {
        parentTraitFunctionsMap.set(
          propertyKey,
          (
            (parentTraitFunctionsMap.has(propertyKey))
              ? (parentTraitFunctionsMap.get(propertyKey) as TGenericTraitFunction).derive(descriptor.value, descriptor)
              : new TraitFunction<PropertyKey, TGenericFunction>(propertyKey, descriptor.value, descriptor)
          ) as TTraitFunctionsFromObject<GTarget>
        );
      } else {
        throw new Error(`Found property which is not a function: '${ String(propertyKey) }'`);
      }
    }
  }
  return parentTraitFunctionsMap;
}

/**
 * Returns a Map of TraitFunction built from an object, and its prototype chain
 */
export function TraitFunctionsFromObjectPrototypeChain<GTarget>(target: GTarget): TTraitFunctionsMapFromObject<GTarget> {
  const prototypes = Array.from(GetPrototypesChain(target)).filter(IsNotPrimitivePrototype).reverse();
  const parentTraitFunctionsMap = new Map<keyof GTarget, TTraitFunctionsFromObject<GTarget>>();
  for (let i = 0, li = prototypes.length; i < li; i++) {
    TraitFunctionsFromObject<GTarget>(prototypes[i], parentTraitFunctionsMap);
  }
  return parentTraitFunctionsMap;
}

/**
 * Returns a Map of TraitFunction built from a class
 */
export function TraitFunctionsFromClass<GClass extends TClassTrait<any>>(_class: GClass): TTraitFunctionsMapFromClass<GClass> {
  return TraitFunctionsFromObjectPrototypeChain<TInferClassTraitInstance<GClass>>(_class.prototype);
}

/**
 * Returns a Trait built from a class
 */
export function TraitFromClass<GClass extends TClassTrait<any>>(_class: GClass): TTraitFromClass<GClass> {
  return new Trait<TTraitFunctionsFromClass<GClass>>(TraitFunctionsFromClass<GClass>(_class).values());
}
