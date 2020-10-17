
// https://tc39.es/proposal-iterator-helpers/#sec-iteratorprototype.every

export type TIteratorEveryCallback<GValue> = (value: GValue) => boolean;

export function IteratorEvery<GValue, GReturn, GNext>(
  iterator: Iterator<GValue, GReturn, GNext>,
  callback: TIteratorEveryCallback<GValue>,
): boolean  {
  if (typeof callback === 'function') {
    let result: IteratorResult<GValue>;
    while (!(result = iterator.next()).done) {
      if (!callback(result.value)) {
        return false;
      }
    }
    return true;
  } else {
    throw new TypeError(`Expected function as callback`);
  }
}
