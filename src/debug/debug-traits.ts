import { TMakeTypedConstructor } from '../core/types/class-types';
import {
  ImplementsTrait, ImplementsTraits, SuperTrait, TMakeSuperTrait, TraitFromClass, TraitsFromClasses
} from '../core/traits';

class A<T> {
  propA: T;

  constructor(value: T) {
    this.propA = value;
  }
}


abstract class ATrait<T> {
  methodA(this: A<T>, value: T) {
    this.propA = value;
  }

  [Symbol.iterator]() {

  }
}

abstract class CTrait<T> {
  methodC(this: A<T>) {
    console.log(this.propA);
  }
}

// class B<T> extends SuperTrait<[ATrait<number>], TMakeTypedConstructor<A<number>, [number], typeof A>>(TraitsFromClasses(ATrait), A) {
//
// }


type BTypedConstructor<T> = TMakeSuperTrait<[ATrait<T>, CTrait<T>], TMakeTypedConstructor<A<T>, [T], typeof A>>;

type BConstructor = {
  new<T>(...args: ConstructorParameters<BTypedConstructor<T>>): InstanceType<BTypedConstructor<T>>;
};

const B: BConstructor = class B<T> extends SuperTrait(TraitsFromClasses(ATrait, CTrait), A) {

} as BConstructor;

export async function debugTrait() {
  (globalThis as any).ATrait = ATrait;
  // const B = SuperTrait(TraitsFromClasses(ATrait), A);
  type T = TMakeTypedConstructor<A<number>, [number], typeof A>;
  const b = new B<number>(1);
  // b.methodA('h');
  b.methodA(5);
  console.log('debug trait');

  if (ImplementsTrait(b, TraitFromClass(ATrait))) {
  // if (ImplementsTrait(B.prototype, TraitFromClass(ATrait))) {
    console.log('implements A trait');
  }

  if (ImplementsTrait(b, TraitFromClass(CTrait))) {
    console.log('implements C trait');
  }

  const c: A<number> = b;
  // if (ImplementsTrait(c, TraitFromClass(ATrait))) {
  if (ImplementsTraits(c, TraitsFromClasses(ATrait, CTrait))) {
    c.methodA('g');
    console.log('implements A & C traits');
  }

  (globalThis as any).B = B;
  (globalThis as any).b = b;
}
