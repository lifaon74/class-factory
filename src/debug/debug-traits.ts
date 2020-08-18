import { SuperTrait, Trait, TraitFromClass, TraitFunction } from '../core/traits/public';


// export async function debugTrait1() {
//   class A<T> {
//     propA: T;
//
//     constructor(value: T) {
//       this.propA = value;
//     }
//   }
//
//
//   abstract class ATrait<T> {
//     methodA(this: A<T>, value: T) {
//       this.propA = value;
//     }
//
//     [Symbol.iterator]() {
//
//     }
//   }
//
//   abstract class CTrait<T> {
//     methodC(this: A<T>) {
//       console.log(this.propA);
//     }
//   }
//
//   // class B<T> extends SuperTrait<[ATrait<number>], TMakeTypedConstructor<A<number>, [number], typeof A>>(TraitsFromClasses(ATrait), A) {
//   //
//   // }
//
//
//   type BTypedConstructor<T> = TMakeSuperTrait<[ATrait<T>, CTrait<T>], TMakeTypedConstructor<A<T>, [T], typeof A>>;
//
//   type BConstructor = {
//     new<T>(...args: ConstructorParameters<BTypedConstructor<T>>): InstanceType<BTypedConstructor<T>>;
//   };
//
//   const B: BConstructor = class B<T> extends SuperTraits(TraitsFromClasses(ATrait, CTrait), A) {
//
//   } as BConstructor;
//
//   (globalThis as any).ATrait = ATrait;
//   // const B = SuperTrait(TraitsFromClasses(ATrait), A);
//   type T = TMakeTypedConstructor<A<number>, [number], typeof A>;
//   const b = new B<number>(1);
//   // b.methodA('h');
//   b.methodA(5);
//   console.log('debug trait');
//
//   if (ImplementsTrait(b, TraitFromClass(ATrait))) {
//     // if (ImplementsTrait(B.prototype, TraitFromClass(ATrait))) {
//     console.log('implements A trait');
//   }
//
//   if (ImplementsTrait(b, TraitFromClass(CTrait))) {
//     console.log('implements C trait');
//   }
//
//   const c: A<number> = b;
//   // if (ImplementsTrait(c, TraitFromClass(ATrait))) {
//   if (ImplementsTraits(c, TraitsFromClasses(ATrait, CTrait))) {
//     c.methodA('g');
//     console.log('implements A & C traits');
//   }
//
//   (globalThis as any).B = B;
//   (globalThis as any).b = b;
// }
//
//
// export async function debugTrait2() {
//
//   class Container {
//     value: number;
//   }
//
//   abstract class MyTrait {
//     propTraitA(this: Container): number {
//       return this.value;
//     }
//
//     abstract propTraitB(): number;
//   }
//
//   // type A = typeof MyTrait.prototype;
//   // type A = TInferClassTrait<MyTrait>;
//   console.log(MyTrait.prototype);
// }
//
//
// export async function debugTrait3() {
//
//   interface IContainer {
//     value: number;
//   }
//
//   interface IMyTrait {
//     propTraitA(this: IContainer): number;
//     propTraitB(): number;
//   }
//
//   /*--*/
//
//   type TTraitConstraint<GTrait> = {
//     [GKey in keyof GTrait]: GTrait[GKey] extends ((...args: any[]) => any)
//       ? object
//       : never;
//   };
//
//   class Trait<GTrait extends TTraitConstraint<GTrait>> {
//     constructor(
//       properties: GTrait
//     ) {
//     }
//   }
//
//
//   class Container {
//     value: number;
//   }
//
//   abstract class MyTrait implements IMyTrait {
//     propTraitA(this: Container): number {
//       return this.value;
//     }
//
//     propTraitB(): number {
//       AbstractMethodCall();
//     };
//   }
//
//   // type StrictType = 'ab';
//   // type Type = (void | undefined | StrictType);
//   // const b: ([Type] extends [void | undefined] ? true: false) = null as any;
//   // const c: ([void | undefined] extends [Type] ? true: false) = null as any;
//   // const d: ([void | undefined] extends [StrictType] ? true: false) = null as any;
//   // const e: ([void] extends [undefined | void] ? true: false) = null as any;
//
//   const a = SuperTraits(TraitsFromClasses(MyTrait));
//   const b = SuperTraits<[], void>([]);
//   class MyClass extends SuperTraits(TraitsFromClasses(MyTrait)) {
//     propTraitB(): number {
//       return 5;
//     }
//   }
//
//   // type A = typeof MyTrait.prototype;
//   // type A = TInferClassTrait<MyTrait>;
//   console.log(MyTrait.prototype);
// }
//
// export async function debugTrait4() {
//
//   abstract class TraitA {
//     methodA() {
//       return 'a';
//     }
//   }
//
//   abstract class TraitB extends TraitA {
//     methodB() {
//       return 'b';
//     }
//   }
//
//   class A extends SuperTraits(TraitsFromClasses(TraitB)) {
//
//   }
//
//   // console.log(Array.from(GetSafePropertyDescriptors(TraitB.prototype)));
//   const a = new A();
//
//   console.log('a', a);
//   console.log('ImplementsTrait TraitB', ImplementsTrait(a, TraitFromClass(TraitB)));
//   console.log('ImplementsTrait TraitA', ImplementsTrait(a, TraitFromClass(TraitA)));
// }
//

export async function debugTrait5() {

  class A {
    propA: number;

    constructor(
      propA: number
    ) {
      this.propA = propA;
    }
  }

  class B extends A {
    propB: number;

    constructor(
      propA: number,
      propB: number,
    ) {
      super(propA);
      this.propB = propB;
    }
  }

  const traitFnc1 = new TraitFunction('methodA', function methodA(this: A, value: number) {
    return this.propA * value * 2;
  });

  const traitFnc2 = traitFnc1.derive(function methodA(this: B, value: number) {
    return this.propB * traitFnc1.call(this, value);
  });

  // const traitFnc3 = traitFnc1.derive(function methodA(this: A) {
  //   return 1;
  // });
  // const traitFnc2 = new TraitFunction('methodB', function (value: number) {
  //   return value * 2;
  // });

  // console.log(traitFnc1.call(new A(3), 4));
  // console.log(traitFnc2.call(new B(3, 5), 4));

  traitFnc1.implementFor(A.prototype);
  traitFnc2.implementFor(B.prototype);
  // traitFnc3.implementFor(A.prototype);

  const a: any = new A(3);
  console.log(a.methodA(4));
  console.log('traitFnc2.isDerivedFrom traitFnc1', traitFnc2.isDerivedFrom(traitFnc1));
  console.log('traitFnc1.isImplementedBy A', traitFnc1.isImplementedBy(new A(0)));
  console.log('traitFnc1.isImplementedBy B', traitFnc1.isImplementedBy(new B(0, 0)));
  console.log('traitFnc2.isImplementedBy B', traitFnc2.isImplementedBy(new B(0, 0)));
}

export async function debugTrait6() {
  class A {
    propA: number;

    constructor(
      propA: number
    ) {
      this.propA = propA;
    }
  }

  class B extends A {
    propB: number;

    constructor(
      propA: number,
      propB: number,
    ) {
      super(propA);
      this.propB = propB;
    }
  }

  class TraitA {
    methodA(this: A, value: number) {
      return this.propA * value * 2;
    }
  }

  class TraitB extends TraitA {
    methodA(this: B, value: number) {
      return this.propB * TraitA.prototype.methodA.call(this, value);
    }
  }

  const traitFnc1 = new TraitFunction('methodA', function methodA(this: A, value: number) {
    return this.propA * value * 2;
  });

  const traitFnc2 = new TraitFunction('methodB', function methodB(this: A, value: number) {
    return this.propA * value * 3;
  });

  const traitFnc3 = traitFnc1.derive(function methodA(this: A, value: number, optional?: string) {
    return 1;
  });

  const traitFnc4 = new TraitFunction('methodB', function methodB(this: A, value: number) {
    return 2;
  });

  const trait1 = new Trait([
    traitFnc1,
    traitFnc2,
  ]);

  const trait2 = trait1.derive([
    traitFnc3,
    // traitFnc4,
  ]);

  const a = trait1.implementFor(A.prototype);
  // const b: typeof a.methodA;

  //const b = trait1.implementFor(A.prototype);
  // type T1 = typeof a.methodA;
  // console.log('trait1.isImplementedBy A', trait1.isImplementedBy(new A(0)));

  console.log('traitFnc3.isDerivedFrom(traitFnc1)', traitFnc3.isDerivedFrom(traitFnc1));
  console.log('trait1.isDerivedFrom(trait2)', trait1.isDerivedFrom(trait2));
  console.log('trait2.isDerivedFrom(trait1)', trait2.isDerivedFrom(trait1));

  const b = trait2.implementFor(A.prototype);
  type T2 = typeof b.methodA;
  type T3 = typeof b.methodB;
  console.log(b.methodA(5));
}

export async function debugTrait7() {
  class A {
    propA: number;

    constructor(
      propA: number
    ) {
      this.propA = propA;
    }
  }

  class B extends A {
    propB: number;

    constructor(
      propA: number,
      propB: number,
    ) {
      super(propA);
      this.propB = propB;
    }
  }

  class TraitA {
    methodA(this: A, value: number) {
      return this.propA * value * 2;
    }
  }

  class TraitB extends TraitA {
    methodA(this: B, value: number) {
      return this.propB * TraitA.prototype.methodA.call(this, value);
    }
  }

  class TraitC {
    methodC() {
      return 'c';
    }
  }

  const traitA = TraitFromClass(TraitA);
  const traitB = TraitFromClass(TraitB);
  const traitC = TraitFromClass(TraitC);
  console.log(traitA);
  console.log(traitB);
  console.log(TraitFromClass(TraitA).equals(TraitFromClass(TraitA)));
  console.log(traitB.isDerivedFrom(traitA));

  // const A1 = traitA.implementFor(A.prototype);

  // const mixedTrait = Trait.mix(traitB, traitC);

  class C extends SuperTrait(Trait.mix(traitB, traitC), B) {

  }

  const c = new C(1, 2);
  console.log('c', c);
  console.log(c.methodA(5));
  console.log(c.methodC());
}

export async function debugTrait() {
  // await debugTrait1();
  // await debugTrait2();
  // await debugTrait3();
  // await debugTrait4();
  // await debugTrait5();
  // await debugTrait6();
  await debugTrait7();
}
