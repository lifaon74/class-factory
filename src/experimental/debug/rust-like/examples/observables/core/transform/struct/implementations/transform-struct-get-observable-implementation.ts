import { Impl } from '../../../../../../core/implementation-decorator';
import {
  TGenericTransformStruct,
  TInferTransformStructGObservable,
  TRANSFORM_PRIVATE_CONTEXT,
} from '../transform-struct';
import { TraitTransformGetObservable } from '../../traits/trait-transform-get-observable';

@Impl()
export class ImplTraitGetObservableForTransformStruct<GSelf extends TGenericTransformStruct> extends TraitTransformGetObservable<GSelf, TInferTransformStructGObservable<GSelf>> {
  getObservable(this: GSelf): TInferTransformStructGObservable<GSelf> {
    return this[TRANSFORM_PRIVATE_CONTEXT].observable;
  }
}

