import { RegisterChildFunctionForObjectPrototypeChain } from '../../../../../function-helpers/register-child-function-for-object-prototype-chain';
import { TraitIteratorNext } from './trait-iterator-next';
import { NATIVE_ITERABLES } from '../trait-iterable/trait-iterable-reflect';


export function ReflectTraitIteratorNextOnObject(iterator: Iterator<any>): void {
  RegisterChildFunctionForObjectPrototypeChain(iterator, 'next', TraitIteratorNext.prototype.next);
}

export function ReflectTraitIteratorNextOnNativeObjects(): void {
  NATIVE_ITERABLES.forEach((iterable: Iterable<any>) => {
    ReflectTraitIteratorNextOnObject(iterable[Symbol.iterator]());
  });
}
