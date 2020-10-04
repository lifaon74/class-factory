import { TGenericFunction } from '../../types/function-types';

export interface IMethod<GPropertyKey extends PropertyKey, GValue> {
  propertyKey: GPropertyKey;
  value: GValue;
  enumerable?: boolean;
  configurable?: boolean;
  writable?: boolean;
}

export type TGenericMethod = IMethod<PropertyKey, any>;

export type TInferMethodPropertyKey<GMethod extends TGenericMethod> =
  GMethod extends IMethod<infer GPropertyKey, any>
    ? GPropertyKey
    : never;

export type TInferMethodValue<GMethod extends TGenericMethod> =
  GMethod extends IMethod<PropertyKey, infer GValue>
    ? GValue
    : never;

export type TInferMethodRecord<GMethod extends TGenericMethod> =
  Record<TInferMethodPropertyKey<GMethod>, TInferMethodValue<GMethod>>;


export type TWithImplementedMethod<GTarget, GMethod extends TGenericMethod> =
  GTarget
  & TInferMethodRecord<GMethod>


export type TInferMethodsFromObject<GObject> = {
  [GKey in keyof GObject]: GObject[GKey] extends TGenericFunction
    ? IMethod<GKey, GObject[GKey]>
    : never;
}[keyof GObject];
