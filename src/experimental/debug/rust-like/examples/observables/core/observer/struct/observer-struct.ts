import { IsObject } from '../../../../../../../object-helpers/is-object';
import { HasProperty } from '../../../../../../../object-helpers/object-has-property';
import { TObserverEmitFunction } from '../observer-types';

/** PRIVATE CONTEXT **/

export const OBSERVER_PRIVATE_CONTEXT: unique symbol = Symbol('observer-private-context');

export interface IObserverPrivateContext<GValue> {
  readonly emit: TObserverEmitFunction<GValue>;
}

export type TObserverPrivateContextFromGSelf<GSelf extends TGenericObserverStruct> = IObserverPrivateContext<TInferObserverStructGValue<GSelf>>;


/** STRUCT DEFINITION **/

export interface IObserverStruct<GValue> {
  readonly [OBSERVER_PRIVATE_CONTEXT]: IObserverPrivateContext<GValue>;
}

export type TGenericObserverStruct = IObserverStruct<any>;

export type TInferObserverStructGValue<GObserverStruct extends TGenericObserverStruct> =
  GObserverStruct extends IObserverStruct<infer GValue>
    ? GValue
    : never;

export function IsObserverStruct<GValue>(value: any): value is IObserverStruct<GValue> {
  return IsObject(value)
    && HasProperty(value, OBSERVER_PRIVATE_CONTEXT);
}
