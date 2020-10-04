import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { RegisterChildFunctionForObjectPrototypeChain } from '../../../function-helpers/register-child-function-for-object-prototype-chain';
import { Trait } from '../../trait/trait-class';
import { NATIVE_ITERABLES } from '../iterable/trait-iterable';


export abstract class TraitIteratorNext<GValue, GReturn = any, GNext = undefined> extends Trait implements Pick<Iterator<GValue, GReturn, GNext>, 'next'> {
  next(...args: [] | [GNext]): IteratorResult<GValue, GReturn> {
    throw CreateAbstractMethodCallError('next');
  }
}

export abstract class TraitIteratorReturn<GValue, GReturn = any> extends Trait implements Required<Pick<Iterator<GValue, GReturn, unknown>, 'return'>> {
  return(value?: GReturn): IteratorResult<GValue, GReturn> {
    throw CreateAbstractMethodCallError('return');
  }
}

export abstract class TraitIteratorThrow<GValue, GReturn = any> extends Trait implements Required<Pick<Iterator<GValue, GReturn, unknown>, 'throw'>> {
  throw(error?: any): IteratorResult<GValue, GReturn> {
    throw CreateAbstractMethodCallError('throw');
  }
}


// export abstract class TraitIterator<GValue, GReturn = any, GNext = undefined> extends mixTraitsAsUnion([TraitIteratorNext, TraitIteratorReturn, TraitIteratorThrow]) {
//   next(...args: [] | [GNext]): IteratorResult<GValue, GReturn> {
//     return super.next(...args);
//   }
//
//   return(value?: GReturn): IteratorResult<GValue, GReturn> {
//     return super.next(value);
//   }
//
//   throw(error?: any): IteratorResult<GValue, GReturn> {
//     return super.next(error);
//   }
// }


export function ReflectTraitIteratorOnObject(iterator: Iterator<any>): void {
  const proto = Object.getPrototypeOf(iterator);
  RegisterChildFunctionForObjectPrototypeChain(proto, 'next', TraitIteratorNext.prototype.next);
  if ('return' in proto) {
    RegisterChildFunctionForObjectPrototypeChain(proto, 'return', TraitIteratorReturn.prototype.return);
  }
  if ('throw' in proto) {
    RegisterChildFunctionForObjectPrototypeChain(proto, 'throw', TraitIteratorThrow.prototype.throw);
  }
}

export function ReflectTraitIteratorOnNativeObjects(): void {
  NATIVE_ITERABLES.forEach((iterable: Iterable<any>) => {
    ReflectTraitIteratorOnObject(iterable[Symbol.iterator]());
  });
}
