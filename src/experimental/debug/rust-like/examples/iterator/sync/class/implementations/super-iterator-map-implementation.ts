import { Impl } from '../../../../../core/implementation-decorator';
import {
  TInferTraitIteratorNextGNext,
  TInferTraitIteratorNextGValue,
} from '../../../../../build-in/iterator/sync/trait-iterator-next/trait-iterator-next';
import { TInferIteratorStructGReturn } from '../../struct/iterator-struct';
import { TraitIteratorMap } from '../../../../../build-in/iterator/sync/trait-iterator-map/trait-iterator-map';
import { ISuperIterator, SuperIterator, TGenericSuperIterator } from '../iterator-class';
import {
  IteratorMap,
  TIteratorMapCallback,
} from '../../../../../build-in/iterator/sync/trait-iterator-map/iterator-map';


@Impl()
export class ImplTraitIteratorMapForSuperIterator<GSelf extends TGenericSuperIterator> extends TraitIteratorMap<GSelf> {
  map<GMappedValue>(
    this: GSelf,
    callback: TIteratorMapCallback<TInferTraitIteratorNextGValue<GSelf>, GMappedValue>,
  ): ISuperIterator<GMappedValue, void, TInferTraitIteratorNextGNext<GSelf>> {
    return SuperIterator.fromIterator<Iterator<GMappedValue, void, TInferTraitIteratorNextGNext<GSelf>>>(
      IteratorMap<TInferTraitIteratorNextGValue<GSelf>, GMappedValue, TInferIteratorStructGReturn<GSelf>, TInferTraitIteratorNextGNext<GSelf>>(this, callback),
    );
  }
}
