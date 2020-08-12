import { TMakeTypedConstructor } from '../core/types/class-types';
import { AbstractMethod, AbstractMethodCall } from '../core/decorators/abstract-method';
import {
  ImplementsTrait, ImplementsTraits, SuperTraits, TInferClassTrait, TMakeSuperTrait, TraitFromClass, TraitsFromClasses
} from '../core/traits';
import { BaseClass } from '../core/base-class';
import { GetPropertyDescriptors, GetSafePropertyDescriptors } from '../core/helpers';




export async function debugTrait1() {
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

  const B: BConstructor = class B<T> extends SuperTraits(TraitsFromClasses(ATrait, CTrait), A) {

  } as BConstructor;

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


export async function debugTrait2() {

  class Container {
    value: number;
  }

  abstract class MyTrait {
    propTraitA(this: Container): number {
      return this.value;
    }

    abstract propTraitB(): number;
  }

  // type A = typeof MyTrait.prototype;
  // type A = TInferClassTrait<MyTrait>;
  console.log(MyTrait.prototype);
}


export async function debugTrait3() {

  interface IContainer {
    value: number;
  }

  interface IMyTrait {
    propTraitA(this: IContainer): number;
    propTraitB(): number;
  }

  /*--*/

  type TTraitConstraint<GTrait> = {
    [GKey in keyof GTrait]: GTrait[GKey] extends ((...args: any[]) => any)
      ? object
      : never;
  };

  class Trait<GTrait extends TTraitConstraint<GTrait>> {
    constructor(
      properties: GTrait
    ) {
    }
  }


  class Container {
    value: number;
  }

  abstract class MyTrait implements IMyTrait {
    propTraitA(this: Container): number {
      return this.value;
    }

    propTraitB(): number {
      AbstractMethodCall();
    };
  }

  // type StrictType = 'ab';
  // type Type = (void | undefined | StrictType);
  // const b: ([Type] extends [void | undefined] ? true: false) = null as any;
  // const c: ([void | undefined] extends [Type] ? true: false) = null as any;
  // const d: ([void | undefined] extends [StrictType] ? true: false) = null as any;
  // const e: ([void] extends [undefined | void] ? true: false) = null as any;

  const a = SuperTraits(TraitsFromClasses(MyTrait));
  const b = SuperTraits<[], void>([]);
  class MyClass extends SuperTraits(TraitsFromClasses(MyTrait)) {
    propTraitB(): number {
      return 5;
    }
  }

  // type A = typeof MyTrait.prototype;
  // type A = TInferClassTrait<MyTrait>;
  console.log(MyTrait.prototype);
}

export async function debugTrait4() {

  abstract class TraitA {
    methodA() {
      return 'a';
    }
  }

  abstract class TraitB extends TraitA {
    methodB() {
      return 'b';
    }
  }

  class A extends SuperTraits(TraitsFromClasses(TraitB)) {

  }

  // console.log(Array.from(GetSafePropertyDescriptors(TraitB.prototype)));
  const a = new A();

  console.log('a', a);
  console.log('ImplementsTrait TraitB', ImplementsTrait(a, TraitFromClass(TraitB)));
  console.log('ImplementsTrait TraitA', ImplementsTrait(a, TraitFromClass(TraitA)));
}

export async function debugTrait() {
  // await debugTrait1();
  // await debugTrait2();
  // await debugTrait3();
  await debugTrait4();
}
