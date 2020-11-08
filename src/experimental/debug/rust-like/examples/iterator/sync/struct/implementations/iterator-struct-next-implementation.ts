import { Impl } from '../../../../../core/implementation-decorator';
import { TraitIteratorNext } from '../../../../../build-in/iterator/sync/trait-iterator-next/trait-iterator-next';
import { VoidArgument } from '../../../../../../../types/void-argument';
import {
  ITERATOR_PRIVATE_CONTEXT,
  TGenericIteratorStruct, TInferIteratorStructGNext,
  TInferIteratorStructGReturn,
  TInferIteratorStructGValue,
} from '../iterator-struct';


@Impl()
export class ImplTraitNextForIteratorStruct<GSelf extends TGenericIteratorStruct> extends TraitIteratorNext<GSelf, TInferIteratorStructGValue<GSelf>, TInferIteratorStructGReturn<GSelf>, TInferIteratorStructGNext<GSelf>> {
  next(this: GSelf, ...value: VoidArgument<TInferIteratorStructGNext<GSelf>>): IteratorResult<TInferIteratorStructGValue<GSelf>, TInferIteratorStructGReturn<GSelf>> {
    return this[ITERATOR_PRIVATE_CONTEXT].next(...value);
  }
}
