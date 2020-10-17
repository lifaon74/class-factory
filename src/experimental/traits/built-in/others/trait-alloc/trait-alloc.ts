import { CreateAbstractMethodCallError } from '../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../../trait/trait-class';

export const ALLOC: unique symbol = Symbol('alloc');

export type TAllocData = object;

/**
 * The <Alloc> trait is used to create a new object (or any value), initialized with some data
 */
export abstract class TraitAllocOLD<GData extends TAllocData, GReturn> extends Trait {
  [ALLOC](data: GData): GReturn {
    throw CreateAbstractMethodCallError('alloc');
  }
}

export abstract class TraitAlloc extends Trait {
  [ALLOC](data: unknown): unknown {
    throw CreateAbstractMethodCallError('alloc');
  }
}

// export type FixAlloc<GTrait extends TraitAllocV2> = Omit<GTrait, typeof ALLOC>

// export type FixAlloc<GParentTrait extends TraitAllocV2, GChildTrait extends TraitAllocV2> =
//   GChildTrait[typeof ALLOC] extends GParentTrait[typeof ALLOC]
//     ? Omit<GParentTrait, typeof ALLOC>
//     : never;

/*---------*/

// export type TAllocFunction = (data: any) => any;
//
// export abstract class TraitAllocTest<GAlloc extends TAllocFunction> extends Trait {
//   [ALLOC]: GAlloc;
// }
//
// DefineTraitMethod(TraitAllocTest, ALLOC, (): never => {
//   throw CreateAbstractMethodCallError('alloc');
// });
//
// export function IsTraitAlloc<GAlloc extends TAllocFunction>(
//   input: any,
// ): input is TTrait<TraitAllocTest<GAlloc>> {
//   return (typeof input === 'function')
//     && (input.prototype instanceof TraitAllocTest);
// }
//
// export function AllocDecorator<GAlloc extends TAllocFunction>(
//   method: GAlloc,
//   descriptor?: TDefineTraitMethodDescriptor
// ): ClassDecorator {
//   return (target: Function): void => {
//     if (IsTraitAlloc(target)) {
//       DefineTraitMethod(target, ALLOC, method, descriptor);
//     } else {
//       throw new TypeError(`Not a TraitAlloc`);
//     }
//   };
// }





