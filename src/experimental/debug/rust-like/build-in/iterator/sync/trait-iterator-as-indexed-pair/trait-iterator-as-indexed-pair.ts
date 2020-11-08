import { Trait } from '../../../../core/trait-decorator';
import {
  TGenericTraitIteratorNext, TInferTraitIteratorNextGNext,
  TInferTraitIteratorNextGValue,
  TraitIteratorNext,
} from '../trait-iterator-next/trait-iterator-next';

@Trait()
export abstract class TraitIteratorAsIndexedPair<GSelf extends TGenericTraitIteratorNext> {
  abstract asIndexedPair(
    this: GSelf,
  ): TraitIteratorNext<any, [TInferTraitIteratorNextGValue<GSelf>, number], void, TInferTraitIteratorNextGNext<GSelf>>;
}

