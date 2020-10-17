import { ReflectTraitIteratorNextOnObject } from '../../trait-iterator-next/trait-iterator-next-reflect';
import { ReflectTraitIteratorReturnOnObject } from '../../trait-iterator-return/trait-iterator-return-reflect';
import { ReflectTraitIteratorThrowOnObject } from '../../trait-iterator-throw/trait-iterator-throw-reflect';
import { NATIVE_ITERABLES } from '../../trait-iterable/trait-iterable-reflect';


export function ReflectTraitIteratorOnObject(iterator: Iterator<any>): void {
  ReflectTraitIteratorNextOnObject(iterator);
  ReflectTraitIteratorReturnOnObject(iterator);
  ReflectTraitIteratorThrowOnObject(iterator);
}

export function ReflectTraitIteratorOnNativeObjects(): void {
  NATIVE_ITERABLES.forEach((iterable: Iterable<any>) => {
    ReflectTraitIteratorOnObject(iterable[Symbol.iterator]());
  });
}
