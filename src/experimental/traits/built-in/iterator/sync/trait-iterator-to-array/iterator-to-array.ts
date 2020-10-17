
// https://tc39.es/proposal-iterator-helpers/#sec-iteratorprototype.toarray

export function IteratorToArray<GValue, GReturn, GNext>(
  iterator: Iterator<GValue, GReturn, GNext>,
): GValue[] {
  const array: GValue[] = [];
  let result: IteratorResult<GValue>;
  while (!(result = iterator.next()).done) {
    array.push(result.value);
  }
  return array;
}
