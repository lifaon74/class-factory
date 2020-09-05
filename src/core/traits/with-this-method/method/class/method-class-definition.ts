import { IMethodStruct } from '../method-struct-definition';
import { TMethodImplementForTypedMethodStruct } from './methods/method-implement-for';
import { TGenericMethodStruct } from '../method-types';
import { TWithImplementedTrait } from '../../traits/trait-types';
import { ITraitStruct } from '../../traits/trait-struct-definition';
import { TMethodIsImplementedByTypedMethodStruct } from './methods/method-is-implemented-by';
import { TMethodCallTypedMethodStruct } from './methods/method-call';
import { TGenericFunction } from '../../../../types/misc-types';
import { TMethodDeriveTypedMethodStruct } from './methods/method-derive';
import { TMethodEqualsTypedMethodStruct } from './methods/method-equals';


export type TMethodClassTypedMethodsUnion<GThis extends TGenericMethodStruct> =
  TMethodCallTypedMethodStruct<GThis>
  | TMethodDeriveTypedMethodStruct<GThis>
  | TMethodEqualsTypedMethodStruct<GThis>
  | TMethodImplementForTypedMethodStruct<GThis>
  | TMethodIsImplementedByTypedMethodStruct<GThis>;

export type TMethodClassTypedTraitStruct<GThis extends TGenericMethodStruct> = ITraitStruct<TMethodClassTypedMethodsUnion<GThis>>;

export type TMethodClassTyped<GThis extends TGenericMethodStruct> = TWithImplementedTrait<GThis, TMethodClassTypedTraitStruct<GThis>>;

/*---*/

export interface IMethodConstructor {
  new<GPropertyKey extends PropertyKey, GFunction extends TGenericFunction>(options: IMethodStruct<GPropertyKey, GFunction>): IMethod<GPropertyKey, GFunction>;
}

export type IMethod<GPropertyKey extends PropertyKey, GFunction extends TGenericFunction> = TMethodClassTyped<{
  readonly value: GFunction;
  readonly propertyKey: GPropertyKey;
  readonly enumerable: boolean;
  readonly configurable: boolean;
  readonly writable: boolean;
}>;





