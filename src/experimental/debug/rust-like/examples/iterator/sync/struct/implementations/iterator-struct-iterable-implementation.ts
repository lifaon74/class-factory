import { Impl } from '../../../../../core/implementation-decorator';
import {
  IIteratorPrivateContext,
  ITERATOR_PRIVATE_CONTEXT,
  TGenericIteratorStruct,
  TInferIteratorStructGNext,
  TInferIteratorStructGReturn,
  TInferIteratorStructGValue,
} from '../iterator-struct';
import { TraitIterable } from '../../../../../build-in/iterator/sync/trait-iterable/trait-iterable';


@Impl()
export class ImplTraitIterableForIteratorStruct<GSelf extends TGenericIteratorStruct> extends TraitIterable<GSelf, IIteratorPrivateContext<TInferIteratorStructGValue<GSelf>, TInferIteratorStructGReturn<GSelf>, TInferIteratorStructGNext<GSelf>>> {
  [Symbol.iterator](this: GSelf): IIteratorPrivateContext<TInferIteratorStructGValue<GSelf>, TInferIteratorStructGReturn<GSelf>, TInferIteratorStructGNext<GSelf>> {
    return this[ITERATOR_PRIVATE_CONTEXT];
  }
}
