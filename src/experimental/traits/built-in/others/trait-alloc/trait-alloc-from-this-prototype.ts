import { ALLOC, TAllocData, TraitAllocOLD } from './trait-alloc';

export type TAllocResultFromThisAndData<GThis extends object, GData extends TAllocData> = Omit<GThis, keyof GData> & GData;

/**
 * An <Alloc> trait which creates an object with the prototype of 'this' as prototype,
 * and reflects 'data' properties on it
 * INFO: use this one if you work with classes (mixTraits)
 */
export abstract class TraitAllocFromThisPrototype<GThis extends object, GData extends TAllocData> extends TraitAllocOLD<GData, TAllocResultFromThisAndData<GThis, GData>> {
  [ALLOC](this: GThis, data: GData): TAllocResultFromThisAndData<GThis, GData> {
    return Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(data));
  }
}


export function AllocFromThisPrototype<GThis extends object, GData extends TAllocData>(thisArg: GThis, data: GData): TAllocResultFromThisAndData<GThis, GData> {
  return Object.create(Object.getPrototypeOf(thisArg), Object.getOwnPropertyDescriptors(data));
}
