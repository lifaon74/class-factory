import { GetTraitMethods } from './trait/get-trait-methods';
import { Trait } from './trait/trait-class';
import { mixTraitsAsInterface, traitIsImplementedBy } from './public';
import { ReflectTraitToStringOnNativeObjects, TraitToString } from './built-in/others/trait-to-string';
import { debugVector2 } from '../debug/vector2';
import { ReflectTraitIteratorOnNativeObjects, TraitIteratorNext } from './built-in/iterator/trait-iterator';
import { ReflectTraitIterableOnNativeObjects, TraitIterable } from './built-in/iterable/trait-iterable';
import { CreatePrivateContext } from '../class-helpers/private/create-private-context';
import { ALLOC, TraitAllocFromThisPrototype } from './built-in/others/trait-alloc';
import { TraitArrayLike } from './built-in/array/trait-array-like';
import { TraitArrayEvery } from './built-in/array/trait-array-every';
import { TraitArraySome } from './built-in/array/trait-array-some';
import { TraitArrayFilter } from './built-in/array/trait-array-filter';
import { TraitArrayJoin } from './built-in/array/trait-array-join';
import { TraitArrayFind } from './built-in/array/trait-array-find';
import { TraitArrayFindIndex } from './built-in/array/trait-array-find-index';
import { TraitArrayForEach } from './built-in/array/trait-array-for-each';
import { TIterateFunction } from './built-in/array/array-types';
import { TraitArrayIncludes } from './built-in/array/trait-array-includes';
import { TraitArrayIndexOf } from './built-in/array/trait-array-index-of';
import { TraitArrayLastIndexOf } from './built-in/array/trait-array-last-index-of';


export async function debugTrait1() {
  class NotATrait {
    methodA() {
      console.log('hello');
    }
  }

  class MyTrait extends Trait {
    methodA() {
      console.log('hello');
    }
  }


  // const a: (NotATrait extends Trait ? true : false) = false;
  // const b: (MyTrait extends Trait ? true : false) = true;

  // const map = GetTraitMethods(NotATrait as any); // => should fail
  const map = GetTraitMethods(MyTrait);
  console.log(map);

  ReflectTraitToStringOnNativeObjects();
  console.log(traitIsImplementedBy(TraitToString, 1));
  console.log(traitIsImplementedBy(TraitToString, {}));
  console.log(traitIsImplementedBy(TraitToString, Object.create(null)));
}

export async function debugTrait2() {
  function * gen() {
    yield 1;
  }

  ReflectTraitIteratorOnNativeObjects();

  console.log(traitIsImplementedBy(TraitIteratorNext, 1));
  console.log(traitIsImplementedBy(TraitIteratorNext, [][Symbol.iterator]()));
  console.log(traitIsImplementedBy(TraitIteratorNext, new Map()[Symbol.iterator]()));
  console.log(traitIsImplementedBy(TraitIteratorNext, gen()));

  ReflectTraitIterableOnNativeObjects();

  console.log(traitIsImplementedBy(TraitIterable, 1));
  console.log(traitIsImplementedBy(TraitIterable, []));
  console.log(traitIsImplementedBy(TraitIterable, new Map()));
  console.log(traitIsImplementedBy(TraitIterable, gen()));
}

export async function debugReadonlyArrayTrait() {

  const READONLY_ARRAY_PRIVATE_CONTEXT: unique symbol = Symbol('readonly-array-private-context');

  interface IReadonlyArrayPrivateContext<GValue> {
    items: GValue[];
  }

  interface ReadonlyArrayStruct<GValue> {
    readonly [READONLY_ARRAY_PRIVATE_CONTEXT]: IReadonlyArrayPrivateContext<GValue>;
  }


  abstract class TraitReadonlyArrayAllocFromThisPrototype<GValue> extends TraitAllocFromThisPrototype<ReadonlyArrayStruct<GValue>, ReadonlyArrayStruct<GValue>, unknown> {
  }

  abstract class TraitReadonlyArrayArrayLike<GValue> extends TraitArrayLike<GValue> {
    length(this: ReadonlyArrayStruct<GValue>): number {
      return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.length;
    }

    item(this: ReadonlyArrayStruct<GValue>, index: number): GValue {
      return this[READONLY_ARRAY_PRIVATE_CONTEXT].items[index];
    }

    [Symbol.iterator](this: ReadonlyArrayStruct<GValue>): IterableIterator<GValue> {
      return this[READONLY_ARRAY_PRIVATE_CONTEXT].items[Symbol.iterator]();
    }
  }


  abstract class TraitReadonlyArrayEvery<GValue> extends TraitArrayEvery<GValue> {
    every(this: ReadonlyArrayStruct<GValue>, callback: TIterateFunction<GValue, this, boolean>): boolean {
      return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.every(callback as any, this);
    }
  }

  abstract class TraitReadonlyArrayFilter<GValue> extends TraitArrayFilter<GValue> {
    filter(this: ReadonlyArrayStruct<GValue>, callback: TIterateFunction<GValue, this, boolean>): this {
      const data = {};
      CreatePrivateContext(READONLY_ARRAY_PRIVATE_CONTEXT, data, { items: this[READONLY_ARRAY_PRIVATE_CONTEXT].items.filter(callback as any, this) })
      return this[ALLOC](data);
    }
  }

  abstract class TraitReadonlyArrayFind<GValue> extends TraitArrayFind<GValue> {
    find(this: ReadonlyArrayStruct<GValue>, callback: TIterateFunction<GValue, this, boolean>): GValue | undefined {
      return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.find(callback as any, this);
    }
  }

  abstract class TraitReadonlyArrayFindIndex<GValue> extends TraitArrayFindIndex<GValue> {
    findIndex(this: ReadonlyArrayStruct<GValue>, callback: TIterateFunction<GValue, this, boolean>): number {
      return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.findIndex(callback as any, this);
    }
  }

  abstract class TraitReadonlyArrayForEach<GValue> extends TraitArrayForEach<GValue> {
    forEach(this: ReadonlyArrayStruct<GValue>, callback: TIterateFunction<GValue, this, void>): void {
      return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.forEach(callback as any, this);
    }
  }

  abstract class TraitReadonlyArrayIncludes<GValue> extends TraitArrayIncludes<GValue> {
    includes(this: ReadonlyArrayStruct<GValue>, value: GValue, fromIndex?: number): boolean {
      return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.includes(value, fromIndex);
    }
  }

  abstract class TraitReadonlyArrayIndexOf<GValue> extends TraitArrayIndexOf<GValue> {
    indexOf(this: ReadonlyArrayStruct<GValue>, value: GValue, fromIndex?: number): number {
      return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.indexOf(value, fromIndex);
    }
  }

  abstract class TraitReadonlyArrayJoin<GValue> extends TraitArrayJoin<GValue> {
    join(this: ReadonlyArrayStruct<GValue>, separator?: string): string {
      return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.join(separator);
    }
  }

  abstract class TraitReadonlyArrayLastIndexOf<GValue> extends TraitArrayLastIndexOf<GValue> {
    lastIndexOf(this: ReadonlyArrayStruct<GValue>, value: GValue, fromIndex?: number): number {
      return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.lastIndexOf(value, fromIndex);
    }
  }

  abstract class TraitReadonlyArraySome<GValue> extends TraitArraySome<GValue> {
    some(this: ReadonlyArrayStruct<GValue>, callback: TIterateFunction<GValue, this, boolean>): boolean {
      return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.some(callback as any, this);
    }
  }



  interface IReadonlyArrayTrait<GValue> extends TraitReadonlyArrayArrayLike<GValue>,
    TraitReadonlyArrayEvery<GValue>,
    TraitReadonlyArrayFilter<GValue>,
    TraitReadonlyArrayFind<GValue>,
    TraitReadonlyArrayFindIndex<GValue>,
    TraitReadonlyArrayForEach<GValue>,
    TraitReadonlyArrayIncludes<GValue>,
    TraitReadonlyArrayIndexOf<GValue>,
    TraitReadonlyArrayJoin<GValue>,
    TraitReadonlyArrayLastIndexOf<GValue>,
    TraitReadonlyArraySome<GValue>,
    TraitReadonlyArrayAllocFromThisPrototype<GValue> {
  }

  const ReadonlyArrayTrait = mixTraitsAsInterface<IReadonlyArrayTrait<any>, void>([
    TraitReadonlyArrayArrayLike,
    TraitReadonlyArrayEvery,
    TraitReadonlyArrayFilter,
    TraitReadonlyArrayFind,
    TraitReadonlyArrayFindIndex,
    TraitReadonlyArrayForEach,
    TraitReadonlyArrayIncludes,
    TraitReadonlyArrayIndexOf,
    TraitReadonlyArrayJoin,
    TraitReadonlyArrayLastIndexOf,
    TraitReadonlyArraySome,
    TraitReadonlyArrayAllocFromThisPrototype,
  ]);

  class ReadonlyArray<GValue> extends ReadonlyArrayTrait implements ReadonlyArrayStruct<GValue> {
    readonly [READONLY_ARRAY_PRIVATE_CONTEXT]: IReadonlyArrayPrivateContext<GValue>;

    constructor(items: GValue[] = []) {
      super();
      CreatePrivateContext(READONLY_ARRAY_PRIVATE_CONTEXT, this, { items });
    }
  }

  const a = new ReadonlyArray<number>([0, 1, 2, 3, 4]);

  (window as any).a = a;
  console.log(a);
  // console.log(a.length());
}

export async function debugTrait() {
  // await debugTrait1();
  // await debugVector2();
  // await debugTrait2();
  await debugReadonlyArrayTrait();
}
