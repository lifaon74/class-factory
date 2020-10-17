import { TraitAllocFromThisPrototype } from '../traits/built-in/others/trait-alloc/trait-alloc-from-this-prototype';
import { TraitArrayLike } from '../traits/built-in/array/trait-array-like';
import { TraitArrayEvery } from '../traits/built-in/array/trait-array-every';
import { TIterateFunction, TReduceFunction } from '../traits/built-in/array/array-types';
import { TraitArrayFilter } from '../traits/built-in/array/trait-array-filter';
import { CreatePrivateContext } from '../class-helpers/private/create-private-context';
import { ALLOC } from '../traits/built-in/others/trait-alloc/trait-alloc';
import { TraitArrayFind } from '../traits/built-in/array/trait-array-find/trait-array-find';
import { TraitArrayFindIndex } from '../traits/built-in/array/trait-array-find-index';
import { TraitArrayForEach } from '../traits/built-in/array/trait-array-for-each';
import { TraitArrayIncludes } from '../traits/built-in/array/trait-array-includes/trait-array-includes';
import { TraitArrayIndexOf } from '../traits/built-in/array/trait-array-index-of';
import { TraitArrayJoin } from '../traits/built-in/array/trait-array-join';
import { TraitArrayLastIndexOf } from '../traits/built-in/array/trait-array-last-index-of';
import { TraitArrayMap } from '../traits/built-in/array/trait-array-map/trait-array-map';
import { TraitArrayReduce } from '../traits/built-in/array/trait-array-reduce';
import { TraitArrayReduceRight } from '../traits/built-in/array/trait-array-reduce-right';
import { TraitArraySlice } from '../traits/built-in/array/trait-array-slice';
import { TraitArraySome } from '../traits/built-in/array/trait-array-some';
import { TraitArrayToString } from '../traits/built-in/array/trait-array-to-string/trait-array-to-string';
import { Trait } from '../traits/trait/trait-class';
import { MixTraitsWithConstructorTyping } from '../traits/trait/mix-traits';
import { ArrayOrIterableToArray } from '../misc/array-or-iterable-to-array';

export const READONLY_ARRAY_PRIVATE_CONTEXT: unique symbol = Symbol('readonly-array-private-context');

export interface IReadonlyArrayPrivateContext<GValue> {
  items: GValue[];
}

export interface ReadonlyArrayStruct<GValue> {
  readonly [READONLY_ARRAY_PRIVATE_CONTEXT]: IReadonlyArrayPrivateContext<GValue>;
}


export abstract class TraitReadonlyArrayAllocFromThisPrototype<GValue> extends TraitAllocFromThisPrototype<ReadonlyArrayStruct<GValue>, ReadonlyArrayStruct<GValue>, unknown> {
}

export function TraitReadonlyArrayAllocFromArray<GValue>(instance: ReadonlyArrayStruct<any>, items: GValue[]): unknown {
  const data = {};
  CreatePrivateContext(READONLY_ARRAY_PRIVATE_CONTEXT, data, { items });
  return instance[ALLOC](data);
}


export abstract class TraitReadonlyArrayArrayLike<GValue> extends TraitArrayLike<GValue> {
  length(this: ReadonlyArrayStruct<GValue>): number {
    return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.length;
  }

  item(this: ReadonlyArrayStruct<GValue>, index: number): GValue {
    return this[READONLY_ARRAY_PRIVATE_CONTEXT].items[index];
  }

  // [Symbol.iterator](this: ReadonlyArrayStruct<GValue>): IterableIterator<GValue> {
  //   return this[READONLY_ARRAY_PRIVATE_CONTEXT].items[Symbol.iterator]();
  // }
}

// TODO => better job !
(TraitReadonlyArrayArrayLike.prototype as any)[Symbol.iterator] = function * <GValue>(this: TraitReadonlyArrayArrayLike<GValue>): Generator<GValue> {
  return this[READONLY_ARRAY_PRIVATE_CONTEXT].items[Symbol.iterator]();
}

export abstract class TraitReadonlyArrayEvery<GValue> extends TraitArrayEvery<GValue> {
  every(this: ReadonlyArrayStruct<GValue>, callback: TIterateFunction<GValue, this, boolean>): boolean {
    return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.every(callback as any, this);
  }
}

export abstract class TraitReadonlyArrayFilter<GValue> extends TraitArrayFilter<GValue> {
  filter(this: ReadonlyArrayStruct<GValue>, callback: TIterateFunction<GValue, this, boolean>): this {
    return TraitReadonlyArrayAllocFromArray<GValue>(this, this[READONLY_ARRAY_PRIVATE_CONTEXT].items.filter(callback as any, this)) as this;
  }
}

export abstract class TraitReadonlyArrayFind<GValue> extends TraitArrayFind<GValue> {
  find(this: ReadonlyArrayStruct<GValue>, callback: TIterateFunction<GValue, this, boolean>): GValue | undefined {
    return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.find(callback as any, this);
  }
}

export abstract class TraitReadonlyArrayFindIndex<GValue> extends TraitArrayFindIndex<GValue> {
  findIndex(this: ReadonlyArrayStruct<GValue>, callback: TIterateFunction<GValue, this, boolean>): number {
    return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.findIndex(callback as any, this);
  }
}

export abstract class TraitReadonlyArrayForEach<GValue> extends TraitArrayForEach<GValue> {
  forEach(this: ReadonlyArrayStruct<GValue>, callback: TIterateFunction<GValue, this, void>): void {
    return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.forEach(callback as any, this);
  }
}

export abstract class TraitReadonlyArrayIncludes<GValue> extends TraitArrayIncludes<GValue> {
  includes(this: ReadonlyArrayStruct<GValue>, value: GValue, fromIndex?: number): boolean {
    return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.includes(value, fromIndex);
  }
}

export abstract class TraitReadonlyArrayIndexOf<GValue> extends TraitArrayIndexOf<GValue> {
  indexOf(this: ReadonlyArrayStruct<GValue>, value: GValue, fromIndex?: number): number {
    return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.indexOf(value, fromIndex);
  }
}

export abstract class TraitReadonlyArrayJoin<GValue> extends TraitArrayJoin<GValue> {
  join(this: ReadonlyArrayStruct<GValue>, separator?: string): string {
    return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.join(separator);
  }
}

export abstract class TraitReadonlyArrayLastIndexOf<GValue> extends TraitArrayLastIndexOf<GValue> {
  lastIndexOf(this: ReadonlyArrayStruct<GValue>, value: GValue, fromIndex?: number): number {
    return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.lastIndexOf(value, fromIndex);
  }
}

export abstract class TraitReadonlyArrayMap<GValue> extends TraitArrayMap<GValue> {
  map<GMappedValue>(this: ReadonlyArrayStruct<GValue>, callback: TIterateFunction<GValue, this, GMappedValue>): TraitArrayLike<GMappedValue> {
    return TraitReadonlyArrayAllocFromArray<GMappedValue>(this, this[READONLY_ARRAY_PRIVATE_CONTEXT].items.map<GMappedValue>(callback as any)) as TraitArrayLike<GMappedValue>;
  }
}

export abstract class TraitReadonlyArrayReduce<GValue> extends TraitArrayReduce<GValue> {
  reduce<GReduceValue>(this: ReadonlyArrayStruct<GValue>, callback: TReduceFunction<GValue, this, GReduceValue>, initialValue: GReduceValue): GReduceValue {
    return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.reduce<GReduceValue>(callback as any, initialValue);
  }
}

export abstract class TraitReadonlyArrayReduceRight<GValue> extends TraitArrayReduceRight<GValue> {
  reduceRight<GReduceValue>(this: ReadonlyArrayStruct<GValue>, callback: TReduceFunction<GValue, this, GReduceValue>, initialValue: GReduceValue): GReduceValue {
    return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.reduceRight<GReduceValue>(callback as any, initialValue);
  }
}

export abstract class TraitReadonlyArraySlice<GValue> extends TraitArraySlice<GValue> {
  slice(this: ReadonlyArrayStruct<GValue>, start?: number, end?: number): this {
    return TraitReadonlyArrayAllocFromArray<GValue>(this, this[READONLY_ARRAY_PRIVATE_CONTEXT].items.slice(start, end)) as this;
  }
}

export abstract class TraitReadonlyArraySome<GValue> extends TraitArraySome<GValue> {
  some(this: ReadonlyArrayStruct<GValue>, callback: TIterateFunction<GValue, this, boolean>): boolean {
    return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.some(callback as any, this);
  }
}

export abstract class TraitReadonlyArrayToString<GValue> extends TraitArrayToString<GValue> {
  toString(): string {
    return this[READONLY_ARRAY_PRIVATE_CONTEXT].items.toString();
  }
}


export interface ITraitReadonlyArraySuperTraits<GValue> extends TraitReadonlyArrayArrayLike<GValue>,
  TraitReadonlyArrayEvery<GValue>,
  TraitReadonlyArrayFilter<GValue>,
  TraitReadonlyArrayFind<GValue>,
  TraitReadonlyArrayFindIndex<GValue>,
  TraitReadonlyArrayForEach<GValue>,
  TraitReadonlyArrayIncludes<GValue>,
  TraitReadonlyArrayIndexOf<GValue>,
  TraitReadonlyArrayJoin<GValue>,
  TraitReadonlyArrayLastIndexOf<GValue>,
  TraitReadonlyArrayMap<GValue>,
  TraitReadonlyArrayReduce<GValue>,
  TraitReadonlyArrayReduceRight<GValue>,
  TraitReadonlyArraySlice<GValue>,
  TraitReadonlyArraySome<GValue>,
  TraitReadonlyArrayToString<GValue>,
  TraitReadonlyArrayAllocFromThisPrototype<GValue>
{
  map<GMappedValue>(this: ReadonlyArrayStruct<GValue>, callback: TIterateFunction<GValue, this, GMappedValue>): ITraitReadonlyArraySuperTraits<GMappedValue>;
}

export interface ITraitReadonlyArraySuperTraitsConstructor extends Trait {
  new<GValue>(): ITraitReadonlyArraySuperTraits<GValue>;
}

export class TraitReadonlyArray<GValue> extends MixTraitsWithConstructorTyping<ITraitReadonlyArraySuperTraitsConstructor>([
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
  TraitReadonlyArrayMap,
  TraitReadonlyArrayReduce,
  TraitReadonlyArrayReduceRight,
  TraitReadonlyArraySlice,
  TraitReadonlyArraySome,
  TraitReadonlyArrayToString,
  TraitReadonlyArrayAllocFromThisPrototype,
], Trait)<GValue> {

}

export class ReadonlyArray<GValue> extends TraitReadonlyArray<GValue> implements ReadonlyArrayStruct<GValue> {
  readonly [READONLY_ARRAY_PRIVATE_CONTEXT]: IReadonlyArrayPrivateContext<GValue>;

  constructor(items: Iterable<GValue>) {
    super();
    CreatePrivateContext(READONLY_ARRAY_PRIVATE_CONTEXT, this, { items: ArrayOrIterableToArray<GValue>(items) });
  }
}
