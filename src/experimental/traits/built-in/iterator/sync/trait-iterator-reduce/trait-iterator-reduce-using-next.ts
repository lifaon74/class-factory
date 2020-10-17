import { Trait } from '../../../../trait/trait-class';
import { TraitIteratorReduce} from './trait-iterator-reduce';
import { TraitIteratorNext } from '../trait-iterator-next/trait-iterator-next';
import { MixTraitsWithConstructorTyping } from '../../../../trait/mix-traits';
import { IteratorReduce, TIteratorReduceCallback } from './iterator-reduce';

interface ITraitIteratorReduceUsingNextSuperTraits<GValue, GReturn, GNext> extends TraitIteratorReduce<GValue>, TraitIteratorNext<GValue, GReturn, GNext> {
}

interface ITraitIteratorReduceUsingNextSuperTraitsConstructor extends Trait {
  new<GValue, GReturn, GNext>(): ITraitIteratorReduceUsingNextSuperTraits<GValue, GReturn, GNext>;
}


export abstract class TraitIteratorReduceUsingNext<GValue, GReturn, GNext> extends MixTraitsWithConstructorTyping<ITraitIteratorReduceUsingNextSuperTraitsConstructor>([TraitIteratorReduce, TraitIteratorNext], Trait)<GValue, GReturn, GNext> {
  reduce(callback: TIteratorReduceCallback<GValue, GValue>): GValue;
  reduce<GReducedValue>(callback: TIteratorReduceCallback<GValue, GReducedValue>, initialValue: GReducedValue): GReducedValue;
  reduce(callback: TIteratorReduceCallback<GValue, any>, initialValue?: any): any {
    return IteratorReduce<GValue, GReturn, GNext>(this, callback);
  }
}

