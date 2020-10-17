import { Trait } from '../../../../trait/trait-class';
import { TraitIteratorMap } from './trait-iterator-map';
import { PureTraitIteratorNext, TraitIteratorNext } from '../trait-iterator-next/trait-iterator-next';
import { MixTraitsWithConstructorTyping } from '../../../../trait/mix-traits';
import { ALLOC, TraitAlloc } from '../../../others/trait-alloc/trait-alloc';
import { IteratorMap, TIteratorMapCallback } from './iterator-map';
import { IteratorToTraitIteratorNext } from '../iterator-functions';

export interface ITraitIteratorMapUsingNextAndGeneratorSuperTraits<GValue, GReturn, GNext> extends TraitIteratorMap<GValue, GReturn, GNext>,
  TraitIteratorNext<GValue, GReturn, GNext>,
  TraitAlloc {
  [ALLOC]<GValue, GReturn, GNext>(data: PureTraitIteratorNext<GValue, GReturn, GNext>): TraitIteratorNext<GValue, GReturn, GNext>;
}

export interface ITraitIteratorMapUsingNextAndGeneratorSuperTraitsConstructor extends Trait {
  new<GValue, GReturn, GNext>(): ITraitIteratorMapUsingNextAndGeneratorSuperTraits<GValue, GReturn, GNext>;
}

export abstract class TraitIteratorMapUsingNextAndAlloc<GValue, GReturn, GNext> extends MixTraitsWithConstructorTyping<ITraitIteratorMapUsingNextAndGeneratorSuperTraitsConstructor>([TraitIteratorMap, TraitIteratorNext], Trait)<GValue, GReturn, GNext> {
  map<GMappedValue>(callback: TIteratorMapCallback<GValue, GMappedValue>): TraitIteratorNext<GMappedValue, GReturn, GNext> {
    return this[ALLOC]<GMappedValue, GReturn, GNext>(IteratorToTraitIteratorNext<GMappedValue, GReturn, GNext>(IteratorMap<GValue, GMappedValue, GReturn, GNext>(this, callback)));
  }
}

