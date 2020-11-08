import { IsObject } from '../../../../../../../object-helpers/is-object';
import { HasProperty } from '../../../../../../../object-helpers/object-has-property';
import { TGenericObserverLike } from '../../observer/observer-types';
import { TGenericObservableLike } from '../../observable/observable-types';

/** PRIVATE CONTEXT **/

export const OBSERVABLE_OBSERVER_PRIVATE_CONTEXT: unique symbol = Symbol('observable-observer-private-context');

export interface IObservableObserverPrivateContext<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike> {
  readonly observable: GObservable;
  readonly observer: GObserver;
}

export type TObservableObserverPrivateContextFromGSelf<GSelf extends TGenericObservableObserverStruct> = IObservableObserverPrivateContext<TInferObservableObserverStructGObserver<GSelf>, TInferObservableObserverStructGObservable<GSelf>>;


/** STRUCT DEFINITION **/

export interface IObservableObserverStruct<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike> {
  readonly [OBSERVABLE_OBSERVER_PRIVATE_CONTEXT]: IObservableObserverPrivateContext<GObserver, GObservable>;
}

export type TGenericObservableObserverStruct = IObservableObserverStruct<any, any>;

export type TInferObservableObserverStructGObservable<GObservableObserverStruct extends TGenericObservableObserverStruct> =
  GObservableObserverStruct extends IObservableObserverStruct<any, infer GObservable>
    ? GObservable
    : never;

export type TInferObservableObserverStructGObserver<GObservableObserverStruct extends TGenericObservableObserverStruct> =
  GObservableObserverStruct extends IObservableObserverStruct<infer GObserver, any>
    ? GObserver
    : never;

export function IsObservableObserverStruct<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike>(value: any): value is IObservableObserverStruct<GObserver, GObservable> {
  return IsObject(value)
    && HasProperty(value, OBSERVABLE_OBSERVER_PRIVATE_CONTEXT);
}
