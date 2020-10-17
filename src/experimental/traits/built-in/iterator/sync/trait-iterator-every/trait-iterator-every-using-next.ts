import { Trait } from '../../../../trait/trait-class';
import { TraitIteratorEvery} from './trait-iterator-every';
import { TraitIteratorNext } from '../trait-iterator-next/trait-iterator-next';
import { MixTraitsWithConstructorTyping } from '../../../../trait/mix-traits';
import { IteratorEvery, TIteratorEveryCallback } from './iterator-every';

interface ITraitIteratorEveryUsingNextSuperTraits<GValue, GReturn, GNext> extends TraitIteratorEvery<GValue>, TraitIteratorNext<GValue, GReturn, GNext> {
}

interface ITraitIteratorEveryUsingNextSuperTraitsConstructor extends Trait {
  new<GValue, GReturn, GNext>(): ITraitIteratorEveryUsingNextSuperTraits<GValue, GReturn, GNext>;
}


export abstract class TraitIteratorEveryUsingNext<GValue, GReturn, GNext> extends MixTraitsWithConstructorTyping<ITraitIteratorEveryUsingNextSuperTraitsConstructor>([TraitIteratorEvery, TraitIteratorNext], Trait)<GValue, GReturn, GNext> {
  every(callback: TIteratorEveryCallback<GValue>): boolean {
    return IteratorEvery<GValue, GReturn, GNext>(this, callback);
  }
}

