import { Trait } from '../../../../core/trait-decorator';
import { TraitIteratorNext } from '../trait-iterator-next/trait-iterator-next';

@Trait()
export abstract class TraitIterable<GSelf, GIteratorNext extends TraitIteratorNext<any, any, any, any>> {
  abstract [Symbol.iterator](this: GSelf): GIteratorNext;
}


