import { Trait } from '../../../trait/trait-class';
import { TraitArrayJoin } from '../trait-array-join';
import { MixTraitsWithInterfaceTyping } from '../../../trait/mix-traits';
import { ITraitArrayToStringSuperTraits, TraitArrayToString } from './trait-array-to-string';


interface ITraitArrayToStringUsingJoinSuperTraits<GValue> extends ITraitArrayToStringSuperTraits<GValue>, TraitArrayJoin<GValue> {
}

export abstract class TraitArrayToStringUsingJoin<GValue> extends MixTraitsWithInterfaceTyping<ITraitArrayToStringUsingJoinSuperTraits<any>, typeof Trait>([TraitArrayToString, TraitArrayJoin], Trait) {
  toString(): string {
    return this.join();
  }
}
