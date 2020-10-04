import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';;
import { RegisterChildFunctionForObjectPrototypeChain } from '../../../function-helpers/register-child-function-for-object-prototype-chain';


export abstract class TraitIterable<GValue> extends Trait implements Iterable<GValue> {
  [Symbol.iterator](): Iterator<GValue> {
    throw CreateAbstractMethodCallError('[Symbol.iterator]');
  }
}


export const NATIVE_ITERABLES = [
  (function *() {})(),
  [],
  new Map(),
  new Set(),
  '',
  new Int8Array(0),
  new Uint8Array(0),
  new Uint8ClampedArray(0),
  new Int16Array(0),
  new Uint16Array(0),
  new Int32Array(0),
  new Uint32Array(0),
  new Float32Array(0),
  new Float64Array(0),
  new BigInt64Array(0),
];

export function ReflectTraitIterableOnObject(iterable: Iterable<any>): void {
  const proto = Object.getPrototypeOf(iterable);
  RegisterChildFunctionForObjectPrototypeChain(proto, Symbol.iterator, TraitIterable.prototype[Symbol.iterator]);
}

export function ReflectTraitIterableOnNativeObjects(): void {
  NATIVE_ITERABLES.forEach((iterable: Iterable<any>) => {
    ReflectTraitIterableOnObject(iterable);
  });
}
