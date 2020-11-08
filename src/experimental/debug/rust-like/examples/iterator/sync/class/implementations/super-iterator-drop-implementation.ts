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
import { IteratorDrop } from '../../../../../build-in/iterator/sync/trait-iterator-drop/iterator-drop';
import { TraitIteratorDrop } from '../../../../../build-in/iterator/sync/trait-iterator-drop/trait-iterator-drop';


@Impl()
export class ImplTraitIteratorDropForSuperIterator<GSelf extends TGenericSuperIterator> extends TraitIteratorDrop<GSelf> {
  drop(this: GSelf, limit: number): ISuperIterator<TInferTraitIteratorNextGValue<GSelf>, void, TInferTraitIteratorNextGNext<GSelf>> {
    return SuperIterator.fromIterator<Iterator<TInferTraitIteratorNextGValue<GSelf>, void, TInferTraitIteratorNextGNext<GSelf>>>(
      IteratorDrop<TInferTraitIteratorNextGValue<GSelf>, TInferIteratorStructGReturn<GSelf>, TInferTraitIteratorNextGNext<GSelf>>(this, limit),
    );
  }
}
