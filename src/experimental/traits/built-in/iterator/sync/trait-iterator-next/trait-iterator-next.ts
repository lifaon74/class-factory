import { CreateAbstractMethodCallError } from '../../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait, TraitWithoutSymbol } from '../../../../trait/trait-class';

export abstract class TraitIteratorNext<GValue, GReturn, GNext> extends Trait implements Pick<Iterator<GValue, GReturn, GNext>, 'next'> {
  next(value: GNext): IteratorResult<GValue, GReturn> {
    throw CreateAbstractMethodCallError('next');
  }
}

export type PureTraitIteratorNext<GValue, GReturn, GNext> = TraitWithoutSymbol<TraitIteratorNext<GValue, GReturn, GNext>>;


