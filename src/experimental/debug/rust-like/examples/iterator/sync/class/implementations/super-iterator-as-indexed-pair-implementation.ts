import { Impl } from '../../../../../core/implementation-decorator';
import {
  TInferTraitIteratorNextGNext,
  TInferTraitIteratorNextGValue,
} from '../../../../../build-in/iterator/sync/trait-iterator-next/trait-iterator-next';
import { TInferIteratorStructGReturn } from '../../struct/iterator-struct';
import { ISuperIterator, SuperIterator, TGenericSuperIterator } from '../iterator-class';
import { IteratorAsIndexedPair } from '../../../../../build-in/iterator/sync/trait-iterator-as-indexed-pair/iterator-as-indexed-pair';
import { TraitIteratorAsIndexedPair } from '../../../../../build-in/iterator/sync/trait-iterator-as-indexed-pair/trait-iterator-as-indexed-pair';

@Impl()
export class ImplTraitIteratorAsIndexedPairForSuperIterator<GSelf extends TGenericSuperIterator> extends TraitIteratorAsIndexedPair<GSelf> {
  asIndexedPair(
    this: GSelf,
  ): ISuperIterator<[TInferTraitIteratorNextGValue<GSelf>, number], void, TInferTraitIteratorNextGNext<GSelf>> {
    return SuperIterator.fromIterator<Iterator<[TInferTraitIteratorNextGValue<GSelf>, number], void, TInferTraitIteratorNextGNext<GSelf>>>(
      IteratorAsIndexedPair<TInferTraitIteratorNextGValue<GSelf>, TInferIteratorStructGReturn<GSelf>, TInferTraitIteratorNextGNext<GSelf>>(this),
    );
  }
}
