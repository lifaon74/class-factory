
// https://tc39.es/proposal-iterator-helpers/#sec-iteratorprototype.reduce

export type TIteratorReduceCallback<GValue, GReducedValue> = (reducedValue: GReducedValue, value: GValue) => GReducedValue;

export function IteratorReduce<GValue, GReturn, GNext>(
  iterator: Iterator<GValue, GReturn, GNext>,
  callback: TIteratorReduceCallback<GValue, GValue>,
): GValue;
export function IteratorReduce<GValue, GReturn, GNext, GReducedValue>(
  iterator: Iterator<GValue, GReturn, GNext>,
  callback: TIteratorReduceCallback<GValue, GReducedValue>,
  initialValue: GReducedValue,
): GReducedValue;
export function IteratorReduce<GValue, GReturn, GNext>(
  iterator: Iterator<GValue, GReturn, GNext>,
  callback: TIteratorReduceCallback<GValue, any>,
  initialValue?: any,
): any  {
  if (typeof callback === 'function') {
    let result: IteratorResult<GValue>;

    if (arguments.length === 2) {
      result = iterator.next();
      if (result.done) {
        throw new TypeError(`Cannot reduce an empty iterator without specifying an initialValue`);
      } else {
        initialValue = result.value;
      }
    }
    while (!(result = iterator.next()).done) {
      initialValue = callback(initialValue, result.value);
    }
    return initialValue;
  } else {
    throw new TypeError(`Expected function as callback`);
  }
}
