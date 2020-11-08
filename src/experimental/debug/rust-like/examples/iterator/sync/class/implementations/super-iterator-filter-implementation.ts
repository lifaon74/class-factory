import { Impl } from '../../../../../core/implementation-decorator';
import {
  TInferTraitIteratorNextGNext,
  TInferTraitIteratorNextGValue,
} from '../../../../../build-in/iterator/sync/trait-iterator-next/trait-iterator-next';
import { TInferIteratorStructGReturn } from '../../struct/iterator-struct';
import { ISuperIterator, SuperIterator, TGenericSuperIterator } from '../iterator-class';
import {
  IteratorFilter,
  TIteratorFilterCallback,
} from '../../../../../build-in/iterator/sync/trait-iterator-filter/iterator-filter';
import { TraitIteratorFilter } from '../../../../../build-in/iterator/sync/trait-iterator-filter/trait-iterator-filter';


@Impl()
export class ImplTraitIteratorFilterForSuperIterator<GSelf extends TGenericSuperIterator> extends TraitIteratorFilter<GSelf> {
  filter(
    this: GSelf,
    callback: TIteratorFilterCallback<TInferTraitIteratorNextGValue<GSelf>>,
  ): ISuperIterator<TInferTraitIteratorNextGValue<GSelf>, void, TInferTraitIteratorNextGNext<GSelf>> {
    return SuperIterator.fromIterator<Iterator<TInferTraitIteratorNextGValue<GSelf>, void, TInferTraitIteratorNextGNext<GSelf>>>(
      IteratorFilter<TInferTraitIteratorNextGValue<GSelf>, TInferIteratorStructGReturn<GSelf>, TInferTraitIteratorNextGNext<GSelf>>(this, callback),
    );
  }
}
