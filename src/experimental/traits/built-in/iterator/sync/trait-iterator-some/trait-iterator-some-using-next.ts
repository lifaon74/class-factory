import { Trait } from '../../../../trait/trait-class';
import { TraitIteratorSome} from './trait-iterator-some';
import { TraitIteratorNext } from '../trait-iterator-next/trait-iterator-next';
import { MixTraitsWithConstructorTyping } from '../../../../trait/mix-traits';
import { IteratorSome, TIteratorSomeCallback } from './iterator-some';

interface ITraitIteratorSomeUsingNextSuperTraits<GValue, GReturn, GNext> extends TraitIteratorSome<GValue>, TraitIteratorNext<GValue, GReturn, GNext> {
}

interface ITraitIteratorSomeUsingNextSuperTraitsConstructor extends Trait {
  new<GValue, GReturn, GNext>(): ITraitIteratorSomeUsingNextSuperTraits<GValue, GReturn, GNext>;
}


export abstract class TraitIteratorSomeUsingNext<GValue, GReturn, GNext> extends MixTraitsWithConstructorTyping<ITraitIteratorSomeUsingNextSuperTraitsConstructor>([TraitIteratorSome, TraitIteratorNext], Trait)<GValue, GReturn, GNext> {
  some(callback: TIteratorSomeCallback<GValue>): boolean {
    return IteratorSome<GValue, GReturn, GNext>(this, callback);
  }
}

