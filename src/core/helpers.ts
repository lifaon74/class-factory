import { AbstractClass } from './types/class-types';
import { SetInstanceOf } from './instance-of';


/*---- OBJECT OPERATIONS ON OWN PROPERTIES ----*/

/**
 * Returns the list of all own properties of an object
 */
export function GetOwnPropertyKeys<GTarget>(target: GTarget): (keyof GTarget)[] {
  return (Object.getOwnPropertyNames(target) as (keyof GTarget)[])
    .concat(Object.getOwnPropertySymbols(target) as (keyof GTarget)[]);
}

/**
 * Returns true if 'target' has 'propertyKey' as own property
 */
export function HasOwnProperty<GTarget, GPropertyKey extends PropertyKey>(
  target: GTarget,
  propertyKey: GPropertyKey,
): target is (GTarget & Record<GPropertyKey, any>) {
  return Object.prototype.hasOwnProperty.call(target, propertyKey);
}

// export function IsPrototypeOf<GTarget, GPropertyKey extends PropertyKey>(
//   target: GTarget,
//   propertyKey: GPropertyKey,
// ): target is (GTarget & Record<GPropertyKey, any>) {
//   return Object.prototype.isPrototypeOf.call(target, propertyKey);
// }

/**
 * Returns the list of all own descriptors of an object
 */
export function * GetOwnPropertyDescriptors<GTarget>(
  target: GTarget
): Generator<[keyof GTarget, PropertyDescriptor, Object], void, void> {
  const keys: (keyof GTarget)[] = GetOwnPropertyKeys<GTarget>(target);
  for (let i = 0, l = keys.length; i < l; i++) {
    const key: (keyof GTarget) = keys[i];
    yield [key, Object.getOwnPropertyDescriptor(target, key) as PropertyDescriptor, target];
  }
}


// list of property names that are common to every objects (should probably not be changed)
export const PRIMITIVE_PROPERTY_NAMES = new Set<PropertyKey>(['prototype', 'constructor']);

export function IsPrimitivePropertyName(name: PropertyKey): boolean {
  return PRIMITIVE_PROPERTY_NAMES.has(name);
}

export function IsNotPrimitivePropertyName(name: PropertyKey): boolean {
  return !IsPrimitivePropertyName(name);
}


/*---- PROTOTYPES CHAIN ----*/

/**
 * Returns the list of all prototypes of an object (includes object itself)
 */
export function * GetPrototypesChain(
  target: any,
): Generator<any, void, void> {
  while (target !== null) {
    yield target;
    target = Object.getPrototypeOf(target);
  }
}

// common (but non exhaustive) list of prototypes that are native to js
export const PRIMITIVE_PROTOTYPES = new Set<any>(['', 0, {}, [], () => {}].map(_ => Object.getPrototypeOf(_)));

export function IsPrimitivePrototype(proto: any): boolean {
  return PRIMITIVE_PROTOTYPES.has(proto);
}

export function IsNotPrimitivePrototype(proto: any): boolean {
  return !IsPrimitivePrototype(proto);
}


/*--*/



export const EXCLUDED_PROPERTY_NAMES: Set<PropertyKey> = new Set<PropertyKey>(['prototype', 'constructor', ...GetOwnPropertyKeys(Object.prototype)]);

/**
 * Returns all descriptors following prototype inheritance for a 'target'
 * @returns iterator [property key, descriptor, target]
 */
export function * GetPropertyDescriptors(target: Object | null): Generator<[PropertyKey, PropertyDescriptor, Object], void, void> {
  const _keys: Set<any> = new Set<any>();
  while (target !== null) {
    const keys: PropertyKey[] = GetOwnPropertyKeys(target);
    for (const key of keys) {
      if (!_keys.has(key)) {
        _keys.add(key);
        yield [key, Object.getOwnPropertyDescriptor(target, key) as PropertyDescriptor, target];
      }
    }
    target = Object.getPrototypeOf(target);
  }
}


export function * GetSafePropertyDescriptors(target: Object | null): Generator<[PropertyKey, PropertyDescriptor, Object], void, void> {
  const iterator: Generator<[PropertyKey, PropertyDescriptor, Object]> = GetPropertyDescriptors(target);
  let result: IteratorResult<[PropertyKey, PropertyDescriptor, Object]>;
  while (!(result = iterator.next()).done) {
    const [propertyName, /*descriptor*/, target] = result.value;
    if (
      (target !== Object.prototype)
      && (target !== Function.prototype)
      && !EXCLUDED_PROPERTY_NAMES.has(propertyName)
    ) {
      yield result.value;
    }
  }
}


/**
 * Copies deeply all properties of 'source' into 'destination'
 */
export function CopyProperties(source: Object, destination: Object, exclude: Set<PropertyKey> = EXCLUDED_PROPERTY_NAMES): void {
  const iterator: Generator<[PropertyKey, PropertyDescriptor, Object]> = GetPropertyDescriptors(source);
  let result: IteratorResult<[PropertyKey, PropertyDescriptor, Object]>;
  while (!(result = iterator.next()).done) {
    const [propertyName, descriptor] = result.value;
    if (!exclude.has(propertyName)) {
      Object.defineProperty(destination, propertyName, descriptor);
    }
  }
}

/**
 * Copies all own properties of 'source' into 'destination'
 */
export function CopyOwnProperties(source: Object, destination: Object, exclude: Set<PropertyKey> = EXCLUDED_PROPERTY_NAMES): void {
  const keys: PropertyKey[] = GetOwnPropertyKeys(source);
  for (const key of keys) {
    const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(source, key);
    if ((descriptor !== void 0) && !exclude.has(key)) {
      Object.defineProperty(destination, key, descriptor);
    }
  }
}

/**
 * Copies deeply the prototype of 'source' into the prototype of 'destination'
 */
export function CopyClassPrototype(source: AbstractClass, destination: AbstractClass, exclude?: Set<PropertyKey>): void {
  CopyProperties(source.prototype, destination.prototype, exclude);
}

/**
 * Copies deeply the static properties of 'source' into 'destination'
 */
export function CopyClassStaticProperties(source: AbstractClass, destination: AbstractClass, exclude?: Set<PropertyKey>): void {
  CopyProperties(source, destination, exclude);
}

/**
 * Copies the name of the class 'source' into 'destination'
 */
export function CopyClassName(source: AbstractClass, destination: AbstractClass): void {
  let descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(source, 'name');
  if (descriptor === void 0) {
    descriptor = {
      configurable: true,
      enumerable: false,
      value: source.name,
      writable: false,
    };
  } else {
    descriptor.value = source.name;
  }
  if (descriptor.configurable) {
    Object.defineProperty(destination, 'name', descriptor);
  }
}

export function SetClassName(_class: AbstractClass, name: string): void {
  Object.defineProperty(_class, 'name', {
    configurable: true,
    enumerable: false,
    value: name,
    writable: false,
  });
}


/**
 * Makes 'destination' a copy of 'source' (and is instanceof source)
 */
export function CopyClass(source: AbstractClass, destination: AbstractClass): void {
  CopyClassPrototype(source, destination); // deeply copies the prototype
  CopyClassStaticProperties(source, destination); // deeply copies static properties => name should be copied
  SetInstanceOf(source, destination);
}



/**
 * Generates a descriptor from another one where its value/get/set are intercepted and mapped this a different 'this'
 */
export function BindDescriptor(mapInstance: ($this: object) => object, key: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor {
  const _descriptor: PropertyDescriptor = {};
  _descriptor.configurable = descriptor.configurable;
  _descriptor.enumerable = descriptor.enumerable;

  if (typeof descriptor.value !== 'undefined') {
    let cachedFunctions: WeakMap<any, any> = new WeakMap<any, any>();
    _descriptor.get = function () {
      const instance: object = mapInstance(this);
      // const value: any = instance[key];
      const value: any = Reflect.get(instance, key);
      if (typeof value === 'function') {
        if (!cachedFunctions.has(value)) {
          cachedFunctions.set(value, value.bind(instance));
        }
        return cachedFunctions.get(value);
      } else {
        return value;
      }
    };
    if (descriptor.writable) {
      _descriptor.set = function (value: any) {
        const instance: object = mapInstance(this);
        // instance[key] = value;
        Reflect.set(instance, key, value);
      };
    }
  } else {
    if (typeof descriptor.get === 'function') {
      _descriptor.get = function () {
        const instance: object = mapInstance(this);
        return (descriptor.get as () => any).call(instance);
      };
    }

    if (typeof descriptor.set === 'function') {
      _descriptor.set = function (value: any) {
        const instance: object = mapInstance(this);
        return (descriptor.set as (v: any) => void).call(instance, value);
      };
    }
  }

  return _descriptor;
}

export function BindDescriptorOld(instance: object, key: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor {
  const _descriptor: PropertyDescriptor = {};
  _descriptor.configurable = descriptor.configurable;
  _descriptor.enumerable = descriptor.enumerable;

  if (typeof descriptor.value !== 'undefined') {
    let cachedFunction: Function;
    let cachedFunctionWithBind: Function;
    _descriptor.get = () => {
      if (typeof instance[key] === 'function') {
        if (cachedFunction !== instance[key]) {
          cachedFunction = instance[key];
          cachedFunctionWithBind = cachedFunction.bind(instance);
        }
        return cachedFunctionWithBind;
      } else {
        return instance[key];
      }
    };
    if (descriptor.writable) {
      _descriptor.set = (value: any) => {
        instance[key] = value;
      };
    }
  } else {
    if (typeof descriptor.get === 'function') {
      _descriptor.get = descriptor.get.bind(instance);
      // _descriptor.get = () => {
      //   debugger;
      //   (descriptor.get as any).call(instance);
      // };
    }

    if (typeof descriptor.set === 'function') {
      _descriptor.set = descriptor.set.bind(instance);
      // _descriptor.set = (value: any) => {
      //   debugger;
      //   (descriptor.set as any).call(instance, value);
      // };
    }
  }

  return _descriptor;
}









