
// https://tc39.es/proposal-iterator-helpers/#sec-iteratorprototype.foreach

export type TIteratorForEachCallback<GValue> = (value: GValue) => void;

export function IteratorForEach<GValue, GReturn, GNext>(
  iterator: Iterator<GValue, GReturn, GNext>,
  callback: TIteratorForEachCallback<GValue>,
): void {
  let result: IteratorResult<GValue>;
  while (!(result = iterator.next()).done) {
    callback(result.value);
  }
}

