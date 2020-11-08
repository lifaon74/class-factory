import { TraitEmit } from '../../../../../build-in/stream/trait-emit/trait-emit';
import { Trait } from '../../../../../core/trait-decorator';

@Trait()
export abstract class TraitObserverEmit<GSelf, GValue> extends TraitEmit<GSelf, GValue, void> {
}

export type TInferTraitObserverEmitGValue<GTrait extends TraitObserverEmit<any, any>> =
  GTrait extends TraitObserverEmit<any, infer GValue>
    ? GValue
    : never;
