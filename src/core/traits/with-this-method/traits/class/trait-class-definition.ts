import {
  TClassToTrait, TClassTrait, TGenericTraitStruct, TInferTraitMethods, TWithImplementedTrait
} from '../trait-types';
import { ITraitStruct } from '../trait-struct-definition';
import { TGenericMethodStruct } from '../../method/method-types';
import { TTraitToClassTypedMethodStruct } from './methods/trait-to-class';
import { TTraitImplementForTypedMethodStruct } from './methods/trait-implement-for';
import { TTraitIsImplementedByTypedMethodStruct } from './methods/trait-is-implemented-by';


export type TTraitClassTypedMethodsUnion<GThis extends TGenericTraitStruct> =
  TTraitIsImplementedByTypedMethodStruct<GThis>
  | TTraitImplementForTypedMethodStruct<GThis>
  | TTraitToClassTypedMethodStruct<GThis>;


export type TTraitClassTypedTraitStruct<GThis extends TGenericTraitStruct> = ITraitStruct<TTraitClassTypedMethodsUnion<GThis>>;

export type TTraitClassTyped<GThis extends TGenericTraitStruct> = TWithImplementedTrait<GThis, TTraitClassTypedTraitStruct<GThis>>;

/*---*/

export interface ITraitStatic {
  fromClass<GClass extends TClassTrait<any>>(
    _class: GClass
  ): ITrait<TInferTraitMethods<TClassToTrait<GClass>>>;
}

export interface ITraitConstructor extends ITraitStatic {
  new<GMethods extends TGenericMethodStruct>(options: ITraitStruct<GMethods>): ITrait<GMethods>;
}

export type ITrait<GMethods extends TGenericMethodStruct> = TTraitClassTyped<{
  readonly methods: ReadonlyArray<GMethods>;
}>;





