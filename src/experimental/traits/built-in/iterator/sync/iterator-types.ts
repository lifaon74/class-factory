
export type IteratorDefaultGReturn = any;

export type IteratorDefaultGNext = undefined;

export interface TIterable<GValue, GReturn, GNext> {
  [Symbol.iterator](): Iterator<GValue, GReturn, GNext>;
}

