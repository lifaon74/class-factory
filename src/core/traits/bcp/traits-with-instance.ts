// import { Constructor, ExcludeConstructor } from './types/class-types';
// import { TupleToIntersection } from './types/misc-types';
// import { ObjectHasOwnProperty } from './helpers';
//
//
// export interface TClassTrait<GInstance> {
//   prototype: GInstance;
// }
//
// export type TInferClassTrait<GClassTrait extends TClassTrait<any>> =
//   GClassTrait extends TClassTrait<infer GTrait>
//     ? GTrait
//     : never;
//
// export type TInferClassTraits<GClassTraits extends TClassTrait<any>[]> = {
//   [GKey in keyof GClassTraits]:  GClassTraits[GKey] extends TClassTrait<infer GTrait>
//     ? GTrait
//     : never;
// };
//
// export type TMakeTraitsIntersection<GTraits extends object[]> = TupleToIntersection<GTraits>;
//
// export type TMakeSuperTraitInstance<GTraits extends object[], GBaseClass extends Constructor> =
//   TMakeTraitsIntersection<GTraits>
//   & InstanceType<GBaseClass>;
//
// export type TMakeSuperTrait<GTraits extends object[], GBaseClass extends Constructor> =
//   ExcludeConstructor<GBaseClass>
//   & {
//   new(...args: ConstructorParameters<GBaseClass>): TMakeSuperTraitInstance<GTraits, GBaseClass>;
// };
//
// export type TBaseClassIsUndefinedOrVoid<GBaseClass extends (Constructor | void | undefined)>
//   = [void] extends [GBaseClass]
//   ? true
//   : (
//     [undefined] extends [GBaseClass]
//       ? true
//       : false
//     );
//
// export type TMakeSuperTraitWithVoidAllowed<GTraits extends object[], GBaseClass extends (Constructor | void | undefined)> =
//   TBaseClassIsUndefinedOrVoid<GBaseClass> extends true
//     ? {
//       new(): TMakeTraitsIntersection<GTraits>;
//     }
//     : TMakeSuperTrait<GTraits, Exclude<GBaseClass, void>>;
//
//
//
//
//
// /*----------------------------*/
//
// export type TInferFunctionThis<GFunction> = GFunction extends (this: infer GThis, ...args: any[]) => any ? GThis : never;
//
// /* AS FUNCTIONS */
//
// export type TGenericTraitFunctionFunction = (instance: any, ...args: any[]) => any;
// export type TTraitFunctionFunctionWithInstance<GInstance> = (instance: GInstance, ...args: any[]) => any;
//
// export type TInferTraitFunctionFunctionInstance<GFunction extends TGenericTraitFunctionFunction> =
//   GFunction extends (instance: infer GInstance, ...args: any[]) => any
//     ? GInstance
//     : never;
//
// export type TInferTraitFunctionFunctionParameters<GFunction extends TGenericTraitFunctionFunction> =
//   GFunction extends (instance: any, ...args: infer GArgs) => any
//     ? GArgs
//     : never;
//
// export type TTraitFunctionFunctionAsMethod<GFunction extends TGenericTraitFunctionFunction> =
//   GFunction extends (instance: infer GInstance, ...args: infer GArgs) => infer GReturn
//     ? (this: GInstance, ...args: GArgs) => GReturn
//     : never;
//
// export type TObjectWithTraitFunction<GObject, GPropertyKey extends PropertyKey, GFunction extends TGenericTraitFunctionFunction> =
//   GObject
//   & Record<GPropertyKey, TTraitFunctionFunctionAsMethod<GFunction>>;
//
// export type TDerivedFunctionConstraint<GDerivedFunction extends TGenericTraitFunctionFunction, GFunction extends TGenericTraitFunctionFunction> =
//   [GDerivedFunction] extends [(instance: infer GInstance, ...args: TInferTraitFunctionFunctionParameters<GFunction>) => ReturnType<GFunction>]
//     ? (
//       GInstance extends TInferTraitFunctionFunctionInstance<GFunction>
//         ? TGenericTraitFunctionFunction
//         : never
//     )
//     : never;
//
// export interface TTraitFunctionOptions {
//   enumerable?: boolean;
//   configurable?: boolean;
//   writable?: boolean;
// }
//
// export class TraitFunction<GPropertyKey extends PropertyKey, GFunction extends TGenericTraitFunctionFunction> {
//   readonly propertyKey: GPropertyKey;
//   readonly fnc: GFunction;
//   readonly enumerable: boolean;
//   readonly configurable: boolean;
//   readonly writable: boolean;
//
//   protected _derived: TraitFunction<GPropertyKey, GFunction>[];
//   protected _implementedBy: WeakSet<any>;
//
//   constructor(
//     propertyKey: GPropertyKey,
//     fnc: GFunction,
//     options: TTraitFunctionOptions = {},
//   ) {
//     this.propertyKey = propertyKey;
//     this.fnc = fnc;
//     this.enumerable = (options.enumerable === void 0) ? true : options.enumerable;
//     this.configurable = (options.configurable === void 0) ? true : options.configurable;
//     this.writable = (options.writable === void 0) ? false : options.writable;
//     this._derived = [];
//     this._implementedBy = new WeakSet<any>();
//   }
//
//   derive<GDerivedFunction extends TDerivedFunctionConstraint<GDerivedFunction, GFunction>>(
//     fnc: GDerivedFunction,
//     options: TTraitFunctionOptions = {},
//   ): TraitFunction<GPropertyKey, GDerivedFunction> {
//     return new TraitFunction<GPropertyKey, GDerivedFunction>(
//       this.propertyKey,
//       fnc,
//       {
//         enumerable: (options.enumerable === void 0) ? this.enumerable : options.enumerable,
//         configurable: (options.configurable === void 0) ? this.configurable : options.configurable,
//         writable: (options.writable === void 0) ? this.writable : options.writable,
//       }
//     );
//   }
//
//   call(instance: TInferTraitFunctionFunctionInstance<GFunction>, ...args: TInferTraitFunctionFunctionParameters<GFunction>): ReturnType<GFunction> {
//     return this.fnc.call(instance, instance, ...args);
//   }
//
//   implementFor<GObject extends TInferTraitFunctionFunctionInstance<GFunction>>(obj: GObject): TObjectWithTraitFunction<GObject, GPropertyKey, GFunction> {
//     if (ObjectHasOwnProperty(obj, this.propertyKey)) {
//       throw new Error(`The property '${ String(this.propertyKey) }' is already implemented`);
//     } else {
//       const fnc: GFunction = this.fnc;
//       Object.defineProperty(obj, this.propertyKey, {
//         value: function(this: GObject, ...args: TInferTraitFunctionFunctionParameters<GFunction>): ReturnType<GFunction> {
//           return fnc.call(this, this, ...args);
//         },
//         enumerable: this.enumerable,
//         configurable: this.configurable,
//         writable: this.writable,
//       });
//       this._implementedBy.add(obj);
//     }
//     return obj as TObjectWithTraitFunction<GObject, GPropertyKey, GFunction>;
//   }
//
//   isImplementedBy<GObject>(obj: GObject): obj is TObjectWithTraitFunction<GObject, GPropertyKey, GFunction> {
//     if (typeof obj === 'object') {
//       while (obj !== null) {
//         if (
//           this._implementedBy.has(obj as any)
//           || this._derived.some((derived: TraitFunction<GPropertyKey, GFunction>) => derived.isImplementedBy<GObject>(obj))
//         ) {
//           return true;
//         } else {
//           obj = Object.getPrototypeOf(obj);
//         }
//       }
//       return false;
//     } else {
//       return false;
//     }
//   }
//
// }
//
//
// /* AS OBJECT */
//
// // export type TTraitObjectConstraint<GTrait extends object> = Record<PropertyKey, TTraitFunctionFunctionWithInstance<GTrait>>;
// //
// // // export class Trait<GTrait extends TTraitObjectConstraint<GTrait>> {
// // //   // readonly traitFunctions: ReadonlyArray<TraitFunction<>>
// // //
// // //   constructor(
// // //     trait: GTrait,
// // //   ) {
// // //   }
// // // }
// //
// // // export type TTraitFunctionTupleToTraitObject<GTraitFunctions extends TraitFunction<PropertyKey, TGenericTraitFunctionFunction>[]> =
// //
// // export class Trait<GTraitFunctions extends TraitFunction<PropertyKey, TGenericTraitFunctionFunction>[]> {
// //   readonly traitFunctions: GTraitFunctions;
// //
// //   constructor(
// //     traitFunctions: GTraitFunctions,
// //   ) {
// //     this.traitFunctions = traitFunctions;
// //   }
// // }
//
// // type fnc1 = (this: string, a: number) => number;
// // type fnc2 = (a: number, b?: number) => number;
// // const a: (fnc1 extends fnc2 ? true : false) = null as any;
// // const b: (fnc2 extends fnc1 ? true : false) = null as any;
//
// // type A = TInferFunctionThis<fnc1>;
// // type A = TInferFunctionThis<fnc2>;
// // const t1 = new TraitFunction<'a', fnc1>('a', () => 1);
// // const t2 = t1.derive<fnc2>(() => 2);
//
// /* AS TRAIT (OBJECT) */
//
// // export type TTrait = Record<PropertyKey, TGenericFunction>;
// //
// // export type TTraitConstraint<GTrait> = {
// //   [GKey in keyof GTrait]: GTrait[GKey] extends TGenericFunction
// //     ? object
// //     : never;
// // };
// //
// // export type TObjectWithTrait<GObject, GTrait extends TTrait> = (GObject & GTrait);
// //
// //
// // export function ImplementTrait<GObject, GTrait extends TTrait>(obj: GObject, trait: GTrait): TObjectWithTrait<GObject, GTrait> {
// //   const iterator: Iterator<[PropertyKey, PropertyDescriptor, Object]> = GetSafeAndUniqPropertyDescriptors(trait);
// //   let result: IteratorResult<[PropertyKey, PropertyDescriptor, Object]>;
// //   while (!(result = iterator.next()).done) {
// //     const [propertyKey, descriptor, target]: [PropertyKey, PropertyDescriptor, Object] = result.value;
// //     if (ObjectHasOwnProperty(obj, propertyKey)) {
// //       throw new Error(`The property '${ String(propertyKey) }' is already implemented`);
// //     } else {
// //       Object.defineProperty(obj, propertyKey, descriptor);
// //     }
// //   }
// //   return obj as any;
// // }
//
//
//
// /*----------------------------*/
//
//
// // export const TRAITS = Symbol('traits');
// //
// //
// // export function RegisterTrait(obj: any, trait: object): void {
// //   if (ObjectHasOwnProperty(obj, TRAITS)) {
// //     obj[TRAITS].add(trait);
// //   } else {
// //     Object.defineProperty(obj, TRAITS, {
// //       value: new WeakSet<object>([trait]),
// //       writable: false,
// //       enumerable: false,
// //       configurable: false,
// //     });
// //   }
// // }
// //
// // export function RegisterTraits(obj: any, traits: object[]): void {
// //   for (let i = 0, l = traits.length; i < l; i++) {
// //     RegisterTrait(obj, traits[i]);
// //   }
// // }
// //
// //
// // export function ImplementTrait<GObject, GTrait extends object>(obj: GObject, trait: GTrait): (GObject & GTrait) {
// //   const iterator: Iterator<[PropertyKey, PropertyDescriptor, Object]> = GetSafePropertyDescriptors(trait);
// //   let result: IteratorResult<[PropertyKey, PropertyDescriptor, Object]>;
// //   while (!(result = iterator.next()).done) {
// //     const [propertyKey, descriptor, target]: [PropertyKey, PropertyDescriptor, Object] = result.value;
// //     if (propertyKey !== TRAITS) {
// //       if (ObjectHasOwnProperty(obj, propertyKey)) {
// //         throw new Error(`The property '${ String(propertyKey) }' is already implemented`);
// //       } else {
// //         RegisterTrait(obj, target);
// //         Object.defineProperty(obj, propertyKey, descriptor);
// //       }
// //     }
// //   }
// //   return obj as any;
// // }
// //
// // export function ImplementTraits<GObject, GTraits extends object[]>(obj: GObject, traits: GTraits): (GObject & TMakeTraitsIntersection<GTraits>) {
// //   for (let i = 0, l = traits.length; i < l; i++) {
// //     ImplementTrait(obj, traits[i]);
// //   }
// //   return obj as any;
// // }
// //
// //
// //
// // export function SuperTraits<GTraits extends object[], GBaseClass extends (Constructor | void | undefined)>(traits: GTraits, baseClass?: GBaseClass): TMakeSuperTraitWithVoidAllowed<GTraits, GBaseClass> {
// //   const TraitClass = (baseClass === void 0)
// //     ? class TraitClass {}
// //     : // @ts-ignore
// //     class TraitClass extends baseClass {};
// //   ImplementTraits(TraitClass.prototype, traits);
// //   return TraitClass as any;
// // }
// //
// //
// // export function ImplementsTrait<GObject, GTrait extends object>(obj: GObject, trait: GTrait): obj is (GObject & GTrait) {
// //   while (obj !== null) {
// //     if (
// //         ObjectHasOwnProperty(obj, TRAITS)
// //         && (obj[TRAITS] as WeakSet<object>).has(trait)
// //       ) {
// //       return true;
// //     } else {
// //       obj = Object.getPrototypeOf(obj);
// //     }
// //   }
// //   return false;
// // }
// //
// // export function ImplementsTraits<GObject, GTraits extends object[]>(obj: GObject, traits: GTraits): obj is (GObject & TMakeTraitsIntersection<GTraits>) {
// //   return traits.every((trait: object) => ImplementsTrait<GObject, object>(obj, trait))
// // }
// //
// //
// // export function TraitFromClass<GClassTrait extends TClassTrait<any>>(classTrait: GClassTrait): TInferClassTrait<GClassTrait> {
// //   return classTrait.prototype;
// // }
// //
// // export function TraitsFromClasses<GClassTraits extends TClassTrait<any>[]>(...classTrait: GClassTraits): TInferClassTraits<GClassTraits> {
// //   return classTrait.map(TraitFromClass) as TInferClassTraits<GClassTraits>;
// // }
// //
// //
// // export function CallTraitMethodOrFallback<
// //   GInstance,
// //   GMethodName extends PropertyKey,
// //   GArgs extends any[],
// //   GReturn,
// //   GTrait extends Record<GMethodName, (...args: GArgs) => GReturn>>(
// //   instance: GInstance,
// //   methodName: PropertyKey,
// //   trait: GTrait,
// //   args: GArgs,
// //   fallback: (instance: GInstance, ...args: GArgs) => GReturn,
// // ): GReturn {
// //   if (ImplementsTrait<GInstance, GTrait>(instance, trait)) {
// //     return instance[methodName](...args);
// //   } else {
// //     return fallback(instance, ...args);
// //   }
// // }
// //
// // // export function CallTraitMethodOrFallback<
// // //   GInstance,
// // //   GMethodName extends PropertyKey,
// // //   GMethod extends (...args: any[]) => any,
// // //   GTrait extends Record<GMethodName, GMethod>>(
// // //   instance: GInstance,
// // //   methodName: PropertyKey,
// // //   fallback: GMethod,
// // //   trait: GTrait,
// // //   args: Parameters<GMethod>,
// // // ): ReturnType<GMethod> {
// // //   if (ImplementsTrait<GInstance, GTrait>(instance, trait)) {
// // //     return instance[methodName](...args);
// // //   } else {
// // //     return fallback();
// // //   }
// // // }
// //
// //
//
//
