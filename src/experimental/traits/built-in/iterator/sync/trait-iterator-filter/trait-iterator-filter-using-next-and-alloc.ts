import { Trait } from '../../../../trait/trait-class';
import { TraitIteratorFilter } from './trait-iterator-filter';
import { PureTraitIteratorNext, TraitIteratorNext } from '../trait-iterator-next/trait-iterator-next';
import { MixTraitsWithConstructorTyping } from '../../../../trait/mix-traits';
import { ALLOC, TraitAlloc } from '../../../others/trait-alloc/trait-alloc';
import { IteratorFilter, TIteratorFilterCallback } from './iterator-filter';
import { IteratorToTraitIteratorNext } from '../iterator-functions';

export interface ITraitIteratorFilterUsingNextAndGeneratorSuperTraits<GValue, GReturn, GNext> extends TraitIteratorFilter<GValue, GReturn, GNext>,
  TraitIteratorNext<GValue, GReturn, GNext>,
  TraitAlloc {
  [ALLOC]<GValue, GReturn, GNext>(data: PureTraitIteratorNext<GValue, GReturn, GNext>): TraitIteratorNext<GValue, GReturn, GNext>;
}

export interface ITraitIteratorFilterUsingNextAndGeneratorSuperTraitsConstructor extends Trait {
  new<GValue, GReturn, GNext>(): ITraitIteratorFilterUsingNextAndGeneratorSuperTraits<GValue, GReturn, GNext>;
}

export abstract class TraitIteratorFilterUsingNextAndAlloc<GValue, GReturn, GNext> extends MixTraitsWithConstructorTyping<ITraitIteratorFilterUsingNextAndGeneratorSuperTraitsConstructor>([TraitIteratorFilter, TraitIteratorNext], Trait)<GValue, GReturn, GNext> {
  filter(callback: TIteratorFilterCallback<GValue>): TraitIteratorNext<GValue, GReturn, GNext> {
    return this[ALLOC]<GValue, GReturn, GNext>(IteratorToTraitIteratorNext<GValue, GReturn, GNext>(IteratorFilter<GValue, GReturn, GNext>(this, callback)));
  }
}

