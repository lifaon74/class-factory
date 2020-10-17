// import { ALLOC, TAllocData, TAllocResultFromThisAndData, TraitAlloc } from './trait-alloc';

// /**
//  * An <Alloc> trait which creates an object with 'this' as prototype (inherits 'this' properties),
//  * and reflects 'data' properties on it
//  * INFO: use this one if you work directly with objects (implementTrait)
//  */
// export abstract class TraitAllocFromThis<GData extends TAllocData, GThis extends object, GReturn extends (TAllocResultFromThisAndData<GData, GThis> | unknown)> extends TraitAlloc<GData> {
//   [ALLOC](this: GThis, data: GData): GReturn {
//     return Object.create(this, Object.getOwnPropertyDescriptors(data));
//   }
// }


