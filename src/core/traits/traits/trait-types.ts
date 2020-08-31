import { TGenericMethodStruct, TInferMethodPropertyKeyAndFunction } from '../method/method-types';
import { ITraitStruct } from './trait-struct-definition';
import { UnionToObject } from '../../types/misc-types';
import { Constructor, ExcludeConstructor, TBaseClassIsUndefinedOrVoid } from '../../types/class-types';


export type TGenericTraitStruct = ITraitStruct<TGenericMethodStruct>;

export type TMethodsUnionToInterface<GMethods extends TGenericMethodStruct> = UnionToObject<TInferMethodPropertyKeyAndFunction<GMethods>>;

export type TInferTraitMethods<GTrait extends TGenericTraitStruct> =
  GTrait extends ITraitStruct<infer GMethods>
    ? GMethods
    : never;

export type TTraitToInterface<GTrait extends TGenericTraitStruct> = TMethodsUnionToInterface<TInferTraitMethods<GTrait>>;

export type TWithImplementedTrait<GTarget, GTrait extends TGenericTraitStruct> =
  GTarget
  & TTraitToInterface<GTrait>;



/* TRAIT TO CLASS */

export type TInferTraitToClassInstance<GTrait extends TGenericTraitStruct, GBaseClass extends Constructor> =
  TWithImplementedTrait<InstanceType<GBaseClass>, GTrait>;

export type TTraitToClassConstructor<GTrait extends TGenericTraitStruct, GBaseClass extends Constructor> =
  ExcludeConstructor<GBaseClass>
  & {
  new(...args: ConstructorParameters<GBaseClass>): TInferTraitToClassInstance<GTrait, GBaseClass>;
}

export type TConstructorOrVoid = Constructor | void | undefined;

export type TTraitToClassConstructorWithVoidAllowed<GTrait extends TGenericTraitStruct, GBaseClass extends TConstructorOrVoid> =
  TBaseClassIsUndefinedOrVoid<GBaseClass> extends true
    ? {
      new(): TTraitToInterface<GTrait>;
    }
    : TTraitToClassConstructor<GTrait, Exclude<GBaseClass, void | undefined>>;



