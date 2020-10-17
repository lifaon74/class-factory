import { TraitArrayLike } from '../trait-array-like';
import { TraitToString } from '../../others/trait-to-string';
import { Trait } from '../../../trait/trait-class';
import { MixTraitsWithConstructorTyping } from '../../../trait/mix-traits';

export interface ITraitArrayToStringSuperTraits<GValue> extends TraitArrayLike<GValue>, TraitToString {
}

interface ITraitArrayToStringSuperTraitsConstructor extends Trait {
  new<GValue>(): ITraitArrayToStringSuperTraits<GValue>;
}

export abstract class TraitArrayToString<GValue> extends MixTraitsWithConstructorTyping<ITraitArrayToStringSuperTraitsConstructor>([TraitArrayLike, TraitToString], Trait)<GValue> {
}


