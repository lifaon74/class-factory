import { Trait } from './trait-class';
import { TInferMethodsFromObject } from '../method/method-types';
import { UnionToIntersection } from '../../types/union-to-intersection-type';
import { TGenericFunction } from '../../types/function-types';

export interface TTrait<GPrototype extends Trait> {
  prototype: GPrototype;
}

export type TGenericTrait = TTrait<Trait>;

export type TInferTraitPrototype<GTrait extends TGenericTrait> =
  GTrait extends TTrait<infer GPrototype>
    ? GPrototype
    : never;

export type TInferTraitMethods<GTrait extends TGenericTrait> =
  TInferMethodsFromObject<TInferTraitPrototype<GTrait>>;

export type TInferTraitPropertyKeys<GTrait extends TGenericTrait> =
  keyof TInferTraitPrototype<GTrait>;


export type TWithImplementedTrait<GTarget, GTrait extends TGenericTrait> =
  TWithImplementedTraitPrototype<GTarget, TInferTraitPrototype<GTrait>>;


export type TWithImplementedTraits<GTarget, GTraitsUnion extends TGenericTrait> =
  TWithImplementedTraitPrototype<GTarget, UnionToIntersection<TInferTraitPrototype<GTraitsUnion>>>;

export type TWithImplementedTraitPrototype<GTarget, GTraitPrototype> =
  GTarget
  & GTraitPrototype;


/**
 * Removes all properties from GPrototype which are not functions
 */

export type TNormalizeTraitPrototypeKeys<GPrototype> = {
  [GKey in keyof GPrototype]: GPrototype[GKey] extends TGenericFunction
    ? GKey
    : never
}[keyof GPrototype];

// type A = Extract<any, any>


export type TNormalizeTraitPrototype<GPrototype> = Pick<GPrototype, TNormalizeTraitPrototypeKeys<GPrototype>>;


// import { TGenericFunction } from '../../types/function-types';
// import { TMethodMapFromObject, TMethodsFromObject } from '../method/method-types';
// import { UnionToIntersection } from '../../../core/types/misc-types';
// import {
//   Constructor,
//   ExcludeConstructor,
//   TBaseClassIsUndefinedOrVoid,
//   TConstructorOrVoid,
// } from '../../../core/types/class-types';
//
//
// export interface TTrait<GPrototype> {
//   prototype: GPrototype;
// }
//
// export type TGenericTrait = TTrait<any>;
//
// export type TInferTraitPrototype<GTrait extends TGenericTrait> =
//   GTrait extends TTrait<infer GPrototype>
//     ? GPrototype
//     : never;
//
// export type TNormalizeTraitPrototype<GTraitPrototype> = {
//   [GKey in keyof GTraitPrototype]: GTraitPrototype[GKey] extends TGenericFunction
//     ? GTraitPrototype[GKey]
//     : never;
// };
//
// export type TMethodsFromTrait<GTrait extends TGenericTrait> =
//   TMethodsFromObject<TInferTraitPrototype<GTrait>>;
//
// export type TMethodMapFromTrait<GTrait extends TGenericTrait> =
//   TMethodMapFromObject<TInferTraitPrototype<GTrait>>;
//
//
// export type TWithImplementedTrait<GTarget, GTrait extends TGenericTrait> =
//   TWithImplementedTraitPrototype<GTarget, TInferTraitPrototype<GTrait>>;
//
//
// export type TWithImplementedTraits<GTarget, GTraitsUnion extends TGenericTrait> =
//   TWithImplementedTraitPrototype<GTarget, UnionToIntersection<TInferTraitPrototype<GTraitsUnion>>>;
//
// export type TWithImplementedTraitPrototype<GTarget, GTraitPrototype> =
//   GTarget
//   & GTraitPrototype;
//
//
//
// // export type TMixTraitsTuple<GTraits extends TGenericTrait[]> =
// //   UnionToIntersection<TupleTypes<GTraits>>;
//
// /* MIX */
//
// export interface TMixTraitsInterfaceWithoutBaseClass<GInterface> {
//   new(): GInterface;
//   // prototype: GInterface;
// }
//
// export interface TMixTraitsInterfaceWithBaseClassConstructor<GInterface, GBaseClass extends Constructor> {
//   new(...args: ConstructorParameters<GBaseClass>): GInterface;
//   // prototype: GInterface;
// }
//
// export type TMixTraitsInterfaceWithBaseClass<GInterface, GBaseClass extends Constructor> =
//   ExcludeConstructor<GBaseClass>
//   & TMixTraitsInterfaceWithBaseClassConstructor<GInterface, GBaseClass>;
//
//
// export type TMixTraitsInterfaceWithOptionalBaseClass<GInterface, GBaseClass extends TConstructorOrVoid> =
//   TBaseClassIsUndefinedOrVoid<GBaseClass> extends true
//     ? TMixTraitsInterfaceWithoutBaseClass<GInterface>
//     : (
//       GBaseClass extends Constructor
//         ? TMixTraitsInterfaceWithBaseClass<GInterface, GBaseClass>
//         : never
//       );
//
//
//
// // export interface TMixTraitPrototypesWithoutBaseClass<GTraitPrototypesUnion> {
// //   new(): UnionToIntersection<GTraitPrototypesUnion>;
// //   // prototype: UnionToIntersection<UnionToIntersection<GTraitPrototypesUnion>>;
// // }
// //
// // export type TMixTraitsWithoutBaseClass<GTraits extends TGenericTrait> =
// //   TMixTraitPrototypesWithoutBaseClass<TInferTraitPrototype<GTraits>>;
// //
// //
// // export interface TMixTraitsWithBaseClassConstructor<GTraitsUnion extends TGenericTrait, GBaseClass extends Constructor> {
// //   new(...args: ConstructorParameters<GBaseClass>): TWithImplementedTraits<InstanceType<GBaseClass>, GTraitsUnion>;
// //   // prototype: TWithImplementedTraits<InstanceType<GBaseClass>, GTraitsUnion>;
// // }
// //
// // export type TMixTraitsWithBaseClass<GTraitsUnion extends TGenericTrait, GBaseClass extends Constructor> =
// //   ExcludeConstructor<GBaseClass>
// //   & TMixTraitsWithBaseClassConstructor<GTraitsUnion, GBaseClass>;
// //
// // export type TMixTraitsWithOptionalBaseClass<GTraitsUnion extends TGenericTrait, GBaseClass extends TConstructorOrVoid> =
// //   TBaseClassIsUndefinedOrVoid<GBaseClass> extends true
// //     ? TMixTraitsWithoutBaseClass<GTraitsUnion>
// //     : (
// //       GBaseClass extends Constructor
// //         ? TMixTraitsWithBaseClass<GTraitsUnion, GBaseClass>
// //         : never
// //       );
//
// export type TMixTraitsWithOptionalBaseClass<GTraitsUnion extends TGenericTrait, GBaseClass extends TConstructorOrVoid> =
//   TMixTraitsInterfaceWithOptionalBaseClass<UnionToIntersection<TInferTraitPrototype<GTraitsUnion>>, GBaseClass>;
//
