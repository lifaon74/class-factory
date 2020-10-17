import { TraitArraySetItem } from '../trait-array-set-item';
import { ResolveArrayEndArgument, ResolveArrayStartArgument } from '../array-functions';
import { Trait } from '../../../trait/trait-class';
import { TraitArrayFill } from './trait-array-fill';
import { MixTraitsWithConstructorTyping } from '../../../trait/mix-traits';
import { TraitArrayLength } from '../trait-array-length';
import { TraitArrayItem } from '../trait-array-item';


interface ITraitArrayFillUsingSetItemSuperTraits<GValue> extends TraitArrayFill<GValue>, TraitArraySetItem<GValue>, TraitArrayLength<GValue>, TraitArrayItem<GValue> {
}

interface ITraitArrayFillUsingSetItemSuperTraitsConstructor extends Trait {
  new<GValue>(): ITraitArrayFillUsingSetItemSuperTraits<GValue>;
}

export abstract class TraitArrayFillUsingSetItem<GValue> extends MixTraitsWithConstructorTyping<ITraitArrayFillUsingSetItemSuperTraitsConstructor>([TraitArrayFill, TraitArraySetItem, TraitArrayLength, TraitArrayItem], Trait)<GValue> {
  fill(value: GValue, start?: number, end?: number): this {
    const length: number = this.length();
    let i: number = ResolveArrayStartArgument(start, length);
    const _end: number = ResolveArrayEndArgument(end, i, length);
    for (; i < _end; i++) {
      this.setItem(i, value);
    }
    return this;
  }
}

