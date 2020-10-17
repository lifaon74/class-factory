
// https://tc39.es/proposal-iterator-helpers/#sec-iteratorprototype.find

export type TIteratorFindCallback<GValue> = (value: GValue) => boolean;

export function IteratorFind<GValue, GReturn, GNext>(
  iterator: Iterator<GValue, GReturn, GNext>,
  callback: TIteratorFindCallback<GValue>,
): GValue | undefined  {
  if (typeof callback === 'function') {
    let result: IteratorResult<GValue>;
    while (!(result = iterator.next()).done) {
      if (callback(result.value)) {
        return result.value;
      }
    }
    return void 0;
  } else {
    throw new TypeError(`Expected function as callback`);
  }
}
