import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export function __alloc__<GData, GThis extends GData>(data: GData, thisArg: GThis): GThis {
  return Object.create(Object.getPrototypeOf(thisArg), Object.getOwnPropertyDescriptors(data));
}

export const ALLOC: unique symbol = Symbol('alloc');

export type TAllocResultFromThisAndData<GData extends object, GThis extends object> = Omit<GThis, keyof GData> & GData;


/**
 * The <Alloc> trait is used to create a new object (or any value), initialized with some data
 */
export abstract class TraitAlloc<GData extends object> extends Trait {
  [ALLOC](data: GData): unknown {
    throw CreateAbstractMethodCallError('alloc');
  }
}

/**
 * An <Alloc> trait which returns 'data'
 * INFO: use this one if you work directly with objects (implementTrait), and you don't want to keep inherited properties
 */
export abstract class TraitAllocNone<GData extends object> extends TraitAlloc<GData> {
  [ALLOC](data: GData): GData {
    return data;
  }
}

/**
 * An <Alloc> trait which creates an object with 'this' as prototype (inherits 'this' properties),
 * and reflects 'data' properties on it
 * INFO: use this one if you work directly with objects (implementTrait)
 */
export abstract class TraitAllocFromThis<GData extends object, GThis extends object, GReturn extends (TAllocResultFromThisAndData<GData, GThis> | unknown)> extends TraitAlloc<GData> {
  [ALLOC](this: GThis, data: GData): GReturn {
    return Object.create(this, Object.getOwnPropertyDescriptors(data));
  }
}

/**
 * An <Alloc> trait which creates an object with the prototype of 'this' as prototype,
 * and reflects 'data' properties on it
 * INFO: use this one if you work with classes (mixTraits)
 */
export abstract class TraitAllocFromThisPrototype<GData extends object, GThis extends object, GReturn extends (TAllocResultFromThisAndData<GData, GThis> | unknown)> extends TraitAlloc<GData> {
  [ALLOC](this: GThis, data: GData): GReturn {
    return Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(data));
  }
}
