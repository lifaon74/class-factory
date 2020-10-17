import { RegisterChildFunctionForObjectPrototypeChain } from '../../../../../function-helpers/register-child-function-for-object-prototype-chain';
import { TraitIteratorReturn } from './trait-iterator-return';
import { NATIVE_ITERABLES } from '../trait-iterable/trait-iterable-reflect';


export function ReflectTraitIteratorReturnOnObject(iterator: Iterator<any>): void {
  if ('return' in iterator) {
    RegisterChildFunctionForObjectPrototypeChain(iterator, 'return', TraitIteratorReturn.prototype.return);
  }
}

export function ReflectTraitIteratorReturnOnNativeObjects(): void {
  NATIVE_ITERABLES.forEach((iterable: Iterable<any>) => {
    ReflectTraitIteratorReturnOnObject(iterable[Symbol.iterator]());
  });
}
