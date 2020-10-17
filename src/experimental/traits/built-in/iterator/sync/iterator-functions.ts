import { TraitIteratorNext } from './trait-iterator-next/trait-iterator-next';

export function IteratorToTraitIteratorNext<GValue, GReturn, GNext>(iterator: Iterator<GValue, GReturn, GNext>): TraitIteratorNext<GValue, GReturn, GNext> {
  return iterator as any;
}
