export type TInferIterableType<GIterable extends Iterable<any>> =
  GIterable extends Iterable<infer GValue>
    ? GValue
    : never;

export function ToArray<GIterable extends Iterable<any>>(
  iterable: GIterable
): TInferIterableType<GIterable>[] {
  return Array.isArray(iterable)
    ? iterable
    : Array.from(iterable);
}
