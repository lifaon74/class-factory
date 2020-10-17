
// https://tc39.es/proposal-iterator-helpers/#sec-iteratorprototype.some

export type TIteratorSomeCallback<GValue> = (value: GValue) => boolean;

export function IteratorSome<GValue, GReturn, GNext>(
  iterator: Iterator<GValue, GReturn, GNext>,
  callback: TIteratorSomeCallback<GValue>,
): boolean  {
  if (typeof callback === 'function') {
    let result: IteratorResult<GValue>;
    while (!(result = iterator.next()).done) {
      if (callback(result.value)) {
        return true;
      }
    }
    return false;
  } else {
    throw new TypeError(`Expected function as callback`);
  }
}
