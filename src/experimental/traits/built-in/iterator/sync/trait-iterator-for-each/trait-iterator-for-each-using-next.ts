import { Trait } from '../../../../trait/trait-class';
import { TraitIteratorForEach} from './trait-iterator-for-each';
import { TraitIteratorNext } from '../trait-iterator-next/trait-iterator-next';
import { MixTraitsWithConstructorTyping } from '../../../../trait/mix-traits';
import { IteratorForEach, TIteratorForEachCallback } from './iterator-for-each';

interface ITraitIteratorForEachUsingNextSuperTraits<GValue, GReturn, GNext> extends TraitIteratorForEach<GValue>, TraitIteratorNext<GValue, GReturn, GNext> {
}

interface ITraitIteratorForEachUsingNextSuperTraitsConstructor extends Trait {
  new<GValue, GReturn, GNext>(): ITraitIteratorForEachUsingNextSuperTraits<GValue, GReturn, GNext>;
}


export abstract class TraitIteratorForEachUsingNext<GValue, GReturn, GNext> extends MixTraitsWithConstructorTyping<ITraitIteratorForEachUsingNextSuperTraitsConstructor>([TraitIteratorForEach, TraitIteratorNext], Trait)<GValue, GReturn, GNext> {
  forEach(callback: TIteratorForEachCallback<GValue>): void {
    return IteratorForEach<GValue, GReturn, GNext>(this, callback);
  }
}

