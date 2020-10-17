import { RegisterChildFunctionForObjectPrototypeChain } from '../../../../../function-helpers/register-child-function-for-object-prototype-chain';
import { TraitIteratorThrow } from './trait-iterator-throw';
import { NATIVE_ITERABLES } from '../trait-iterable/trait-iterable-reflect';

export function ReflectTraitIteratorThrowOnObject(iterator: Iterator<any>): void {
  if ('throw' in iterator) {
    RegisterChildFunctionForObjectPrototypeChain(iterator, 'throw', TraitIteratorThrow.prototype.throw);
  }
}

export function ReflectTraitIteratorThrowOnNativeObjects(): void {
  NATIVE_ITERABLES.forEach((iterable: Iterable<any>) => {
    ReflectTraitIteratorThrowOnObject(iterable[Symbol.iterator]());
  });
}
