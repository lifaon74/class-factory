import { Trait } from '../../../../trait/trait-class';
import { TraitIteratorFind} from './trait-iterator-find';
import { TraitIteratorNext } from '../trait-iterator-next/trait-iterator-next';
import { MixTraitsWithConstructorTyping } from '../../../../trait/mix-traits';
import { IteratorFind, TIteratorFindCallback } from './iterator-find';

interface ITraitIteratorFindUsingNextSuperTraits<GValue, GReturn, GNext> extends TraitIteratorFind<GValue>, TraitIteratorNext<GValue, GReturn, GNext> {
}

interface ITraitIteratorFindUsingNextSuperTraitsConstructor extends Trait {
  new<GValue, GReturn, GNext>(): ITraitIteratorFindUsingNextSuperTraits<GValue, GReturn, GNext>;
}


export abstract class TraitIteratorFindUsingNext<GValue, GReturn, GNext> extends MixTraitsWithConstructorTyping<ITraitIteratorFindUsingNextSuperTraitsConstructor>([TraitIteratorFind, TraitIteratorNext], Trait)<GValue, GReturn, GNext> {
  find(callback: TIteratorFindCallback<GValue>): GValue | undefined {
    return IteratorFind<GValue, GReturn, GNext>(this, callback);
  }
}

