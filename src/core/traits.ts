import { Constructor, ExcludeConstructor } from './types/class-types';
import { TupleToIntersection } from './types/misc-types';
import { GetOwnPropertyDescriptors, ObjectHasOwnProperty } from './helpers';


export interface TClassTrait<GInstance> {
  prototype: GInstance;
}

export type TInferClassTrait<GClassTrait extends TClassTrait<any>> =
  GClassTrait extends TClassTrait<infer GTrait>
    ? GTrait
    : never;

export type TInferClassTraits<GClassTraits extends TClassTrait<any>[]> = {
  [GKey in keyof GClassTraits]:  GClassTraits[GKey] extends TClassTrait<infer GTrait>
    ? GTrait
    : never;
};

export type TMakeTraitsIntersection<GTraits extends object[]> = TupleToIntersection<GTraits>;

export type TMakeSuperTraitInstance<GTraits extends object[], GBaseClass extends Constructor> =
  TMakeTraitsIntersection<GTraits>
  & InstanceType<GBaseClass>;

export type TMakeSuperTrait<GTraits extends object[], GBaseClass extends Constructor> =
  ExcludeConstructor<GBaseClass>
  & {
  new(...args: ConstructorParameters<GBaseClass>): TMakeSuperTraitInstance<GTraits, GBaseClass>;
};

export type TBaseClassIsUndefinedOrVoid<GBaseClass extends (Constructor | void | undefined)>
  = [void] extends [GBaseClass]
  ? true
  : (
    [undefined] extends [GBaseClass]
      ? true
      : false
    );

export type TMakeSuperTraitWithVoidAllowed<GTraits extends object[], GBaseClass extends (Constructor | void | undefined)> =
  TBaseClassIsUndefinedOrVoid<GBaseClass> extends true
    ? {
      new(): TMakeTraitsIntersection<GTraits>;
    }
    : TMakeSuperTrait<GTraits, Exclude<GBaseClass, void>>;


export type TTraitConstraint<GTrait> = {
  [GKey in keyof GTrait]: GTrait[GKey] extends ((...args: any[]) => any)
  ? object
  : never;
}



export const TRAITS = Symbol('traits');


export function RegisterTraits(obj: any, traits: object[]): void {
  if (ObjectHasOwnProperty(obj, TRAITS)) {
    const _traits: WeakSet<object> = obj[TRAITS];
    for (let i = 0, l = traits.length; i < l; i++) {
      _traits.add(traits[i]);
    }
  } else {
    Object.defineProperty(obj, TRAITS, {
      value: new WeakSet<object>(traits),
      writable: false,
      enumerable: false,
      configurable: false,
    })
  }
}

export function ImplementTraits<GObject, GTraits extends object[]>(obj: GObject, traits: GTraits): (GObject & TMakeTraitsIntersection<GTraits>) {
  RegisterTraits(obj, traits);

  for (let i = 0, l = traits.length; i < l; i++) {
    const trait: object = traits[i];
    if (
      (trait !== null)
      && (typeof trait === 'object')
      && (Object.getPrototypeOf(trait) === Object.prototype)
    ) {
      const iterator: Iterator<[PropertyKey, PropertyDescriptor, Object]> = GetOwnPropertyDescriptors(trait);
      let result: IteratorResult<[PropertyKey, PropertyDescriptor, Object]>;
      while (!(result = iterator.next()).done) {
        const [propertyKey, descriptor]: [PropertyKey, PropertyDescriptor] = result.value;
        if ((propertyKey !== 'constructor') && (propertyKey !== TRAITS)) {
          if (ObjectHasOwnProperty(obj, propertyKey)) {
            throw new Error(`The property '${ String(propertyKey) }' is already implemented`);
          } else {
            Object.defineProperty(obj, propertyKey, descriptor);
          }
        }
      }
    } else {
      throw new Error(`The trait must be a plain object`);
    }
  }
  return obj as any;
}


export function SuperTraits<GTraits extends object[], GBaseClass extends (Constructor | void | undefined)>(traits: GTraits, baseClass?: GBaseClass): TMakeSuperTraitWithVoidAllowed<GTraits, GBaseClass> {
  const TraitClass = (baseClass === void 0)
    ? class TraitClass {}
    : // @ts-ignore
    class TraitClass extends baseClass {};
  ImplementTraits(TraitClass.prototype, traits);
  return TraitClass as any;
}


export function ImplementsTrait<GObject, GTrait extends object>(obj: GObject, trait: GTrait): obj is (GObject & GTrait) {
  if (
    (obj !== null)
    && (typeof obj === 'object')
  ) {
    if (
      ObjectHasOwnProperty(obj, TRAITS)
      && (obj[TRAITS] as WeakSet<object>).has(trait)
    ) {
      return true;
    } else {
      return ImplementsTrait<any, GTrait>(Object.getPrototypeOf(obj), trait);
    }
  } else {
    return false;
  }
}

export function ImplementsTraits<GObject, GTraits extends object[]>(obj: GObject, traits: GTraits): obj is (GObject & TMakeTraitsIntersection<GTraits>) {
  return traits.every((trait: object) => ImplementsTrait<GObject, object>(obj, trait))
}


export function TraitFromClass<GClassTrait extends TClassTrait<any>>(classTrait: GClassTrait): TInferClassTrait<GClassTrait> {
  return classTrait.prototype;
}

export function TraitsFromClasses<GClassTraits extends TClassTrait<any>[]>(...classTrait: GClassTraits): TInferClassTraits<GClassTraits> {
  return classTrait.map(TraitFromClass) as TInferClassTraits<GClassTraits>;
}


export function CallTraitMethodOrFallback<
  GInstance,
  GMethodName extends PropertyKey,
  GArgs extends any[],
  GReturn,
  GTrait extends Record<GMethodName, (...args: GArgs) => GReturn>>(
  instance: GInstance,
  methodName: PropertyKey,
  trait: GTrait,
  args: GArgs,
  fallback: (instance: GInstance, ...args: GArgs) => GReturn,
): GReturn {
  if (ImplementsTrait<GInstance, GTrait>(instance, trait)) {
    return instance[methodName](...args);
  } else {
    return fallback(instance, ...args);
  }
}

// export function CallTraitMethodOrFallback<
//   GInstance,
//   GMethodName extends PropertyKey,
//   GMethod extends (...args: any[]) => any,
//   GTrait extends Record<GMethodName, GMethod>>(
//   instance: GInstance,
//   methodName: PropertyKey,
//   fallback: GMethod,
//   trait: GTrait,
//   args: Parameters<GMethod>,
// ): ReturnType<GMethod> {
//   if (ImplementsTrait<GInstance, GTrait>(instance, trait)) {
//     return instance[methodName](...args);
//   } else {
//     return fallback();
//   }
// }




