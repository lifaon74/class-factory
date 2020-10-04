import { TraitToString } from '../traits/built-in/others/trait-to-string';
import { ALLOC, TraitAlloc, TraitAllocFromThisPrototype } from '../traits/built-in/others/trait-alloc';
import { TraitSubtract } from '../traits/built-in/arithmetic/trait-subtract';
import { TraitNegate } from '../traits/built-in/arithmetic/trait-negate';
import {
  callTraitMethodOnObject,
  mixTraitsAsInterface,
  mixTraitsAsUnion,
  traitIsImplementedBy,
} from '../traits/public';
import { TraitAdd } from '../traits/built-in/arithmetic/trait-add';
import { Trait } from '../traits/trait/trait-class';
// interface ITraitVector2AddMixedTraits extends TraitAdd<Vector2Struct, unknown>, TraitVector2Alloc {}

// const symb = Symbol('symb');
// class A {
//   [symb]: number;
// }
//
// const a: Pick<A, keyof A> = new A();
// const b = a[symb]


// // const __a: TInferClassInstance<typeof Trait>;
// const _a: TNormalizeTraitPrototype<A> = null as any;
// const _b1: TInferClassInstance<typeof Trait> = null as any;
// const _b2: TNormalizeTraitPrototypeKeys<A> = null as any;
// // const _b3: Omit<TInferClassInstance<typeof Trait>, TNormalizeTraitPrototypeKeys<A>> = null as any;
// const _b3: Omit<TInferClassInstance<typeof Trait>, 'a'> = null as any;
// const _b3_1: keyof TInferClassInstance<typeof Trait> = null as any;
// const _b3_2: Pick<TInferClassInstance<typeof Trait>, keyof TInferClassInstance<typeof Trait>> = null as any;
// const _b4: TMixTraitsInterfaceWithBaseClassInstance<A, typeof Trait> = null as any;
// // _b3.
// _b3_2.
//
// const _b: TMixTraitsInterfaceWithBaseClass<A, typeof Trait> = null as any;
// // const _b: TOmitPrototype<typeof Trait> & {prototype: {o: 'l' }} = null as any;
// const _c: TMixTraitsInterfaceWithBaseClassConstructor<A, typeof Trait> = null as any;
// // _b.prototype.
// _c.prototype.prototype
// // const _d: TMixTraitsInterfaceWithBaseClass<A, typeof Trait> = null as any;
// // _d.prototype.
//
// // const _h: ExcludeConstructor<typeof Trait> = null as any;
// const _h: Trait & Pick<typeof Trait, never> = null as any;
//
// // _b.prototype.
// // const g = new _b();
//
// const _z: TMixTraitsInterfaceWithOptionalBaseClass<A, typeof Trait> = null as any;
// // _z.prototype.
// // const _a: Omit<Trait, TNormalizeTraitPrototypeKeys<A>>;
//
// const a = mixTraitsAsInterface<A, typeof Trait>([TraitAdd, TraitVector2Alloc], Trait);
// const a = mixTraitsAsUnion([TraitAdd, TraitVector2Alloc], Trait);
// const b = a.prototype;
// const c = new a();


//

// const a = mixTraitsAsUnion([TraitAdd, TraitVector2Alloc], Trait);


// abstract class TraitVector2Add extends mixTraitsAsInterface<ITraitVector2AddMixedTraits, typeof Trait>([TraitAdd, TraitVector2Alloc], Trait) {


interface Vector2Struct {
  x: number;
  y: number;
}


abstract class TraitVector2ToString extends TraitToString {
  toString(this: Vector2Struct): string {
    return `vec2(${ this.x }, ${ this.y })`;
  }
}

abstract class TraitVector2Alloc extends TraitAlloc<Vector2Struct> {
}

abstract class TraitVector2AllocFromThisPrototype extends TraitAllocFromThisPrototype<Vector2Struct, Vector2Struct, unknown> {
}

abstract class TraitVector2Length extends Trait {
  length(this: Vector2Struct): number {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }
}

abstract class TraitVector2Normalize extends TraitVector2Alloc {
  normalize(this: Vector2Struct): this {
    const length = callTraitMethodOnObject(TraitVector2Length, 'length', this, []);
    return this[ALLOC]({
      x: this.x / length,
      y: this.y / length,
    }) as this;
  }
}

abstract class TraitVector2Add extends mixTraitsAsUnion([TraitAdd, TraitVector2Alloc], Trait) {
  add(this: Vector2Struct & TraitVector2Alloc, value: Vector2Struct): this {
    return this[ALLOC]({
      x: this.x + value.x,
      y: this.y + value.y,
    }) as this;
  }
}

abstract class TraitVector2AddSelf extends Trait {
  addSelf(this: Vector2Struct, value: Vector2Struct): this {
    this.x += value.x;
    this.y += value.y;
    return this as any;
  }
}

abstract class TraitVector2Sub extends mixTraitsAsUnion([TraitSubtract, TraitVector2Alloc], Trait) {
  subtract(this: Vector2Struct & TraitVector2Alloc, value: Vector2Struct): this {
    return this[ALLOC]({
      x: this.x - value.x,
      y: this.y - value.y,
    }) as this;
  }
}

abstract class TraitVector2Negate extends mixTraitsAsUnion([TraitNegate, TraitVector2Alloc], Trait) {
  negate(this: Vector2Struct): this {
    return this[ALLOC]({
      x: -this.x,
      y: -this.y,
    }) as this;
  }
}


interface IVector2Trait extends TraitVector2Length,
  TraitVector2Normalize,
  TraitVector2Add,
  TraitVector2Negate,
  TraitVector2Sub,
  TraitVector2ToString,
  TraitVector2AddSelf,
  TraitVector2AllocFromThisPrototype {
}

const Vector2Trait = mixTraitsAsInterface<IVector2Trait, typeof Trait>([
  TraitVector2Length,
  TraitVector2Normalize,
  TraitVector2Add,
  TraitVector2Negate,
  TraitVector2Sub,
  TraitVector2ToString,
  TraitVector2AddSelf,
  TraitVector2AllocFromThisPrototype,
]);

class Vector2 extends Vector2Trait implements Vector2Struct {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }
}


export async function debugVector2() {
  const a = new Vector2(1, 2);
  console.log(a.negate().toString());
  console.log(a.addSelf(new Vector2(4, 5)).toString());
  console.log(a.normalize());


  console.log(traitIsImplementedBy(TraitVector2AllocFromThisPrototype, a));
  console.log(traitIsImplementedBy(Vector2, a));

  (window as any).Vector2 = Vector2;
  // const vecA$ = implementTraits([TraitVector2ToString, TraitVector2Negate, TraitVector2AllocFromThis] as (typeof TraitVector2ToString | typeof TraitVector2Negate | typeof TraitVector2AllocFromThis)[], vecA);
  // console.log(vecA$.negate().toString());

  // console.log(traitIsImplementedBy(TraitVector2ToString, vecA));
  // console.log(traitIsImplementedBy(TraitVector2New, vecA));
  // console.log(traitIsImplementedBy(TraitVector2NewWithTraits, vecA));
  //
  // console.log(vecA$.toString());
}
