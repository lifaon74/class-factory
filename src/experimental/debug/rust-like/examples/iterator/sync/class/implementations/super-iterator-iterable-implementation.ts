import { Impl } from '../../../../../core/implementation-decorator';
import { TGenericSuperIterator } from '../iterator-class';
import { TraitIterable } from '../../../../../build-in/iterator/sync/trait-iterable/trait-iterable';


@Impl()
export class ImplTraitIterableForSuperIterator<GSelf extends TGenericSuperIterator> extends TraitIterable<GSelf, GSelf> {
  [Symbol.iterator](this: GSelf): GSelf {
    return this;
  }
}

