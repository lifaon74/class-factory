import { Trait } from '../../../../trait/trait-class';
import { TraitIteratorToArray} from './trait-iterator-to-array';
import { TraitIteratorNext } from '../trait-iterator-next/trait-iterator-next';
import { MixTraitsWithConstructorTyping } from '../../../../trait/mix-traits';
import { IteratorToArray } from './iterator-to-array';

interface ITraitIteratorToArrayUsingNextSuperTraits<GValue, GReturn, GNext> extends TraitIteratorToArray<GValue>, TraitIteratorNext<GValue, GReturn, GNext> {
}

interface ITraitIteratorToArrayUsingNextSuperTraitsConstructor extends Trait {
  new<GValue, GReturn, GNext>(): ITraitIteratorToArrayUsingNextSuperTraits<GValue, GReturn, GNext>;
}


export abstract class TraitIteratorToArrayUsingNext<GValue, GReturn, GNext> extends MixTraitsWithConstructorTyping<ITraitIteratorToArrayUsingNextSuperTraitsConstructor>([TraitIteratorToArray, TraitIteratorNext], Trait)<GValue, GReturn, GNext> {
  toArray(): GValue[] {
    return IteratorToArray<GValue, GReturn, GNext>(this);
  }
}

