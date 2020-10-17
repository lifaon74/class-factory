import { Trait } from '../../../../../trait/trait-class';
import { ITraitIteratorSuperTraits, TraitIterator } from '../trait-iterator/trait-iterator';
import { MixTraitsWithConstructorTyping } from '../../../../../trait/mix-traits';
import { TraitIterable } from '../../trait-iterable/trait-iterable';

interface ITraitGeneratorSuperTraits<GValue, GReturn, GNext> extends ITraitIteratorSuperTraits<GValue, GReturn, GNext>, TraitIterable<GValue, GReturn, GNext> {
}

interface ITraitGeneratorSuperTraitsConstructor extends Trait {
  new<GValue, GReturn, GNext>(): ITraitGeneratorSuperTraits<GValue, GReturn, GNext>;
}

export abstract class TraitGenerator<GValue, GReturn, GNext>
  extends MixTraitsWithConstructorTyping<ITraitGeneratorSuperTraitsConstructor>([TraitIterator, TraitIterable], Trait)<GValue, GReturn, GNext> /*implements Generator<GValue, GReturn, GNext> */{

}

