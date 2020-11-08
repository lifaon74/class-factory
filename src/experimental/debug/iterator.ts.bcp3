import {
  AllocFromThisPrototype,
  TAllocResultFromThisAndData,
  TraitAllocFromThisPrototype,
} from '../traits/built-in/others/trait-alloc/trait-alloc-from-this-prototype';
import { Trait } from '../traits/trait/trait-class';
import { MixTraitsWithConstructorTyping } from '../traits/trait/mix-traits';
import { CreatePrivateContext } from '../class-helpers/private/create-private-context';
import { TraitIterator } from '../traits/built-in/iterator/sync/mixed/trait-iterator/trait-iterator';
import { TraitIteratorForEachUsingNext } from '../traits/built-in/iterator/sync/trait-iterator-for-each/trait-iterator-for-each-using-next';
import { TraitIteratorMap } from '../traits/built-in/iterator/sync/trait-iterator-map/trait-iterator-map';
import {
  PureTraitIteratorNext,
  TraitIteratorNext,
} from '../traits/built-in/iterator/sync/trait-iterator-next/trait-iterator-next';
import { IteratorMap, TIteratorMapCallback } from '../traits/built-in/iterator/sync/trait-iterator-map/iterator-map';
import { TraitIteratorFilter } from '../traits/built-in/iterator/sync/trait-iterator-filter/trait-iterator-filter';
import {
  IteratorFilter,
  TIteratorFilterCallback,
} from '../traits/built-in/iterator/sync/trait-iterator-filter/iterator-filter';
import { TraitIterable } from '../traits/built-in/iterator/sync/trait-iterable/trait-iterable';
import { TraitIteratorToArrayUsingNext } from '../traits/built-in/iterator/sync/trait-iterator-to-array/trait-iterator-to-array-using-next';
import { TIterable } from '../traits/built-in/iterator/sync/iterator-types';
import { TraitIteratorTake } from '../traits/built-in/iterator/sync/trait-iterator-take/trait-iterator-take';
import { IteratorTake } from '../traits/built-in/iterator/sync/trait-iterator-take/iterator-take';
import { TraitIteratorDrop } from '../traits/built-in/iterator/sync/trait-iterator-drop/trait-iterator-drop';
import { IteratorDrop } from '../traits/built-in/iterator/sync/trait-iterator-drop/iterator-drop';
import { TraitIteratorAsIndexedPair } from '../traits/built-in/iterator/sync/trait-iterator-as-indexed-pair/trait-iterator-as-indexed-pair';
import { IteratorAsIndexedPair } from '../traits/built-in/iterator/sync/trait-iterator-as-indexed-pair/iterator-as-indexed-pair';
import { TraitIteratorReduceUsingNext } from '../traits/built-in/iterator/sync/trait-iterator-reduce/trait-iterator-reduce-using-next';
import { TraitIteratorSomeUsingNext } from '../traits/built-in/iterator/sync/trait-iterator-some/trait-iterator-some-using-next';
import { TraitIteratorEveryUsingNext } from '../traits/built-in/iterator/sync/trait-iterator-every/trait-iterator-every-using-next';
import { TraitIteratorFindUsingNext } from '../traits/built-in/iterator/sync/trait-iterator-find/trait-iterator-find-using-next';
import {
  TraitIteratorMapUsingNextAndAlloc,
} from '../traits/built-in/iterator/sync/trait-iterator-map/trait-iterator-map-using-next-and-alloc';
import { IsObject } from '../object-helpers/is-object';
import { TraitIteratorFilterUsingNextAndAlloc } from '../traits/built-in/iterator/sync/trait-iterator-filter/trait-iterator-filter-using-next-and-alloc';
import { ALLOC, TraitAlloc } from '../traits/built-in/others/trait-alloc/trait-alloc';
import { ImplementTraitOnObject } from '../traits/trait/implement-trait-on-object';
import { TraitToString } from '../traits/built-in/others/trait-to-string';
import { ReflectTraitIteratorOnNativeObjects } from '../traits/built-in/iterator/sync/mixed/trait-iterator/trait-iterator-reflect';
import { traitIsImplementedBy } from '../traits/public';
import { ReflectTraitIterableOnNativeObjects } from '../traits/built-in/iterator/sync/trait-iterable/trait-iterable-reflect';


/** STRUCTURE **/

export const SUPER_ITERATOR_PRIVATE_CONTEXT: unique symbol = Symbol('super-iterator-private-context');

export interface ISuperIteratorPrivateContext<GValue, GReturn, GNext> {
  next: (...args: [] | [GNext]) => IteratorResult<GValue, GReturn>;
  return?: (value?: GReturn) => IteratorResult<GValue, GReturn>;
  throw?: (error?: any) => IteratorResult<GValue, GReturn>;
}

export interface ISuperIteratorStruct<GValue, GReturn, GNext> {
  readonly [SUPER_ITERATOR_PRIVATE_CONTEXT]: ISuperIteratorPrivateContext<GValue, GReturn, GNext>;
}

export function IsSuperIteratorStruct<GValue = unknown, GReturn = unknown, GNext = unknown>(value: any): value is ISuperIteratorStruct<GValue, GReturn, GNext> {
  return IsObject(value)
    && (SUPER_ITERATOR_PRIVATE_CONTEXT in value);
}

/** DEFINITION **/

export type TSuperIteratorStructOrIteratorNext<GValue, GReturn, GNext> =
  ISuperIteratorStruct<GValue, GReturn, GNext>
  | PureTraitIteratorNext<GValue, GReturn, GNext>;

export interface ISuperIterator<GValue, GReturn, GNext> extends
  ISuperIteratorStruct<GValue, GReturn, GNext>,
  TraitAlloc,
  TraitIteratorNext<GValue, GReturn, GNext>,
  TraitIteratorMapUsingNextAndAlloc<GValue, GReturn, GNext>,
  TraitIteratorFilterUsingNextAndAlloc<GValue, GReturn, GNext>
{
  [ALLOC]<GValue, GReturn, GNext>(
    dataOrIterator: TSuperIteratorStructOrIteratorNext<GValue, GReturn, GNext>,
  ): ISuperIterator<GValue, GReturn, GNext>;

  map<GMappedValue>(callback: TIteratorMapCallback<GValue, GMappedValue>): ISuperIterator<GMappedValue, GReturn, GNext>;

  filter(callback: TIteratorFilterCallback<GValue>): ISuperIterator<GValue, GReturn, GNext>;
}



// export abstract class TraitSuperIteratorTake<GValue, GReturn, GNext> extends TraitIteratorTake<GValue, GReturn, GNext> {
//   take(
//     this: TTraitSuperIteratorWithNextAllocAndStruct<GValue, GReturn, GNext>,
//     limit: number,
//   ): TTraitSuperIteratorWithNextAllocAndStruct<GValue, GReturn, GNext> {
//     return TraitSuperIteratorAllocFromIterator<GValue, GReturn, GNext>(this, IteratorTake<GValue, GReturn, GNext>(this, limit));
//   }
// }
//
// export abstract class TraitSuperIteratorDrop<GValue, GReturn, GNext> extends TraitIteratorDrop<GValue, GReturn, GNext> {
//   drop(
//     this: TTraitSuperIteratorWithNextAllocAndStruct<GValue, GReturn, GNext>,
//     limit: number,
//   ): TTraitSuperIteratorWithNextAllocAndStruct<GValue, GReturn, GNext> {
//     return TraitSuperIteratorAllocFromIterator<GValue, GReturn, GNext>(this, IteratorDrop<GValue, GReturn, GNext>(this, limit));
//   }
// }
//
// export abstract class TraitSuperIteratorAsIndexedPair<GValue, GReturn, GNext> extends TraitIteratorAsIndexedPair<GValue, GReturn, GNext> {
//   asIndexedPair(this: TTraitSuperIteratorWithNextAllocAndStruct<GValue, GReturn, GNext>): TTraitSuperIteratorWithNextAllocAndStruct<[GValue, number], GReturn, GNext> {
//     return TraitSuperIteratorAllocFromIterator<[GValue, number], GReturn, GNext>(this, IteratorAsIndexedPair<GValue, GReturn, GNext>(this));
//   }
// }
//
// export abstract class TraitSuperIteratorReduce<GValue, GReturn, GNext> extends TraitIteratorReduceUsingNext<GValue, GReturn, GNext> {
// }
//
// export abstract class TraitSuperIteratorToArray<GValue, GReturn, GNext> extends TraitIteratorToArrayUsingNext<GValue, GReturn, GNext> {
// }
//
// export abstract class TraitSuperIteratorForEach<GValue, GReturn, GNext> extends TraitIteratorForEachUsingNext<GValue, GReturn, GNext> {
// }
//
// export abstract class TraitSuperIteratorSome<GValue, GReturn, GNext> extends TraitIteratorSomeUsingNext<GValue, GReturn, GNext> {
// }
//
// export abstract class TraitSuperIteratorEvery<GValue, GReturn, GNext> extends TraitIteratorEveryUsingNext<GValue, GReturn, GNext> {
// }
//
// export abstract class TraitSuperIteratorFind<GValue, GReturn, GNext> extends TraitIteratorFindUsingNext<GValue, GReturn, GNext> {
// }
//
// export abstract class TraitSuperIteratorIterable<GValue, GReturn, GNext> extends TraitIterable<GValue, GReturn, GNext> {
//   [Symbol.iterator](this: TTraitSuperIteratorWithNextAllocAndStruct<GValue, GReturn, GNext>): TraitIteratorNext<GValue, GReturn, GNext> {
//     return this;
//   }
// }


/** MIX TRAITS **/

interface ITraitSuperIteratorSuperTraitsConstructor {
  new<GValue, GReturn, GNext>(): ISuperIterator<GValue, GReturn, GNext>;
}

class TraitSuperIterator<GValue, GReturn, GNext> extends MixTraitsWithConstructorTyping<ITraitSuperIteratorSuperTraitsConstructor>([
  TraitAlloc,
  TraitIteratorNext,
  TraitIteratorMapUsingNextAndAlloc,
  TraitIteratorFilterUsingNextAndAlloc,
  // TraitSuperIteratorFilter,
  // TraitSuperIteratorTake,
  // TraitSuperIteratorDrop,
  // TraitSuperIteratorAsIndexedPair,
  // TraitSuperIteratorReduce,
  // TraitSuperIteratorToArray,
  // TraitSuperIteratorForEach,
  // TraitSuperIteratorSome,
  // TraitSuperIteratorEvery,
  // TraitSuperIteratorFind,
  // TraitSuperIteratorIterable,
], Trait)<GValue, GReturn, GNext> {
}

/** CLASS **/

export class SuperIterator<GValue, GReturn, GNext> extends TraitSuperIterator<GValue, GReturn, GNext> implements ISuperIterator<GValue, GReturn, GNext> {
  static fromIterable<GValue, GReturn, GNext>(iterable: TIterable<GValue, GReturn, GNext>): SuperIterator<GValue, GReturn, GNext> {
    return new SuperIterator<GValue, GReturn, GNext>(iterable[Symbol.iterator]());
  }

  readonly [SUPER_ITERATOR_PRIVATE_CONTEXT]: ISuperIteratorPrivateContext<GValue, GReturn, GNext>;

  constructor(iterator: Iterator<GValue, GReturn, GNext>) {
    super();
    CreatePrivateContext(SUPER_ITERATOR_PRIVATE_CONTEXT, this, iterator);
  }

  [ALLOC]<GValue, GReturn, GNext>(
    this: ISuperIterator<any, any, any>,
    dataOrIterator: TSuperIteratorStructOrIteratorNext<GValue, GReturn, GNext>,
  ): ISuperIterator<GValue, GReturn, GNext> {
    let data: ISuperIteratorStruct<GValue, GReturn, GNext>;
    if (IsSuperIteratorStruct<GValue, GReturn, GNext>(dataOrIterator)) {
      data = dataOrIterator;
    } else {
      data = {} as any;
      CreatePrivateContext(SUPER_ITERATOR_PRIVATE_CONTEXT, data, dataOrIterator);
    }
    return AllocFromThisPrototype<ISuperIterator<GValue, GReturn, GNext>, ISuperIteratorStruct<GValue, GReturn, GNext>>(this, data);
  }

  next(value: GNext): IteratorResult<GValue, GReturn> {
    return this[SUPER_ITERATOR_PRIVATE_CONTEXT].next(value);
  }
}


/*----------------------*/

export async function debugIteratorTrait() {


  ImplementTraitOnObject(TraitToString, {}, 'native');

  const testImplementation = () => {
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
  };

  const testMethods = () => {
    ReflectTraitIteratorOnNativeObjects();
    const iterable = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // TODO continue here => implement more Iterator methods

    (window as any).SuperIterator = SuperIterator;

    // SuperIterator.fromIterable(iterable)
    //   .forEach((value: number) => {
    //     console.log(value);
    //   });

    const r = SuperIterator.fromIterable(iterable)
        // .filter((value: number) => (value > 1)) // [2, 3, ...]
        // .take(7) // [0, 1, ..., 6]
        // .drop(3) // [3, 4, ..., 9]
        // .asIndexedPair() // [[0, 0], [1, 1], ....]
        .map((value: number) => (value * 2)) // [0, 2, 4, ..., 18]
      // .reduce((sum: number, value: number) => (sum + value), 0) // 45
      // .toArray() // [0, 1, ..., 9]
      // .forEach((value: any) => console.log(value)) // 0, 1, 2, ...
      // .some((value: number) => (value > 5)) // true
      // .every((value: number) => (value > 5)) // false
      // .find((value: number) => (value > 5)) // 6
    ;
    console.log(r);
    console.log(Array.from(r as any));
  };

  // testImplementation();
  testMethods();
}


