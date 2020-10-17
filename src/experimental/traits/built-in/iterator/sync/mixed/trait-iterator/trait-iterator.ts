import { Trait } from '../../../../../trait/trait-class';
import { TraitIteratorNext } from '../../trait-iterator-next/trait-iterator-next';
import { TraitIteratorThrow } from '../../trait-iterator-throw/trait-iterator-throw';
import { TraitIteratorReturn } from '../../trait-iterator-return/trait-iterator-return';
import { MixTraitsWithConstructorTyping } from '../../../../../trait/mix-traits';


export interface ITraitIteratorSuperTraits<GValue, GReturn, GNext> extends TraitIteratorNext<GValue, GReturn, GNext>, TraitIteratorReturn<GValue, GReturn>, TraitIteratorThrow<GValue, GReturn> {
}

export interface ITraitIteratorTraitsConstructor extends Trait {
  new<GValue, GReturn, GNext>(): ITraitIteratorSuperTraits<GValue, GReturn, GNext>;
}

export abstract class TraitIterator<GValue, GReturn, GNext>
  extends MixTraitsWithConstructorTyping<ITraitIteratorTraitsConstructor>([TraitIteratorNext, TraitIteratorReturn, TraitIteratorThrow], Trait)<GValue, GReturn, GNext> {
}
