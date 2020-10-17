
export function ArrayOrIterableToArray<GValue>(iterable: Iterable<GValue>): GValue[] {
  return Array.isArray(iterable)
    ? iterable
    : Array.from(iterable);
}
