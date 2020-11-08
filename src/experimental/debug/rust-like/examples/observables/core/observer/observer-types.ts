import { TInferTraitObserverEmitGValue, TraitObserverEmit } from './traits/trait-observer-emit';
import { TraitIsImplementedBy } from '../../../../core/trait-is-implemented-by';

export interface IObserverLike<GValue> extends TraitObserverEmit<any, GValue> {
}

export type TGenericObserverLike = IObserverLike<any>;

export type TInferObserverLikeGValue<GObserverLike extends TGenericObserverLike> = TInferTraitObserverEmitGValue<GObserverLike>;

export function IsObserverLike<GValue>(value: any): value is IObserverLike<GValue> {
  return TraitIsImplementedBy(TraitObserverEmit, value);
}


/*---*/

export type TObserverEmitFunction<GValue> = (value: GValue) => void;
