import { TGenericFunction, TupleFirst, TupleLast, TupleShift } from '../core/types/misc-types';


/** HELPERS **/

// export type TArrayInferRemainingElements<GArray extends any[], GFirstElements extends any[]> =
//   GArray extends [...GFirstElements, ...infer GRemainingElements]
//     ? GRemainingElements
//     : never;
//
// export type TArrayPop<GArray extends any[]> =
//   GArray extends []
//     ? never
//     : (
//       GArray extends [...infer GFirstElements, last: any]
//         ? GFirstElements
//         : never
//       );
//
//
//
// export type TCurryArgs<GArgs extends any[]> = {
//   empty: []
//   nonEmpty: (
//     GArgs extends [...rest: infer Rest, last: any]
//       ? TCurryArgs<Rest>
//       : never
//     ) | GArgs
//   infinite: GArgs
// }[
//   GArgs extends []
//     ? 'empty'
//     : GArgs extends (infer Item)[]
//     ? Item[] extends GArgs
//       ? 'infinite'
//       : 'nonEmpty'
//     : never
//   ];
//
// export type TCurryReturnFunction<GFunction extends TGenericFunction, GArgs extends TCurryArgs<Parameters<GFunction>>> = () => ReturnType<GFunction>;
//
//
//
// // const b: TArrayInferRemainingElements<[1, 2, 3], [1]> = null as any;
// // const b: TArrayPop<[1, 2, 3]> = null as any;
// const b: TArrayPop<[]> = null as any;
// const b: TCurryArgs<[1, 2]>;
// const b: TCurryArgs<[]>;
// const b: TCurryArgs<any[]>;
// //
// // const a: (['a', 'b'] extends ['a'] ? true : false) = null as any;
//
// export function curry<GFunction extends TGenericFunction, GArgs extends TCurryArgs<Parameters<GFunction>>>(
//   fn: GFunction,
//   ...args: GArgs
// ): TCurryReturnFunction<GFunction, GArgs>  {
//   return (..._arg: any) => {
//     return fn(...args, ..._arg);
//   };
// }


/*---*/


export type TPipeFunction<GInput, GReturn> = (input: GInput) => GReturn;
export type TGenericPipeFunction = TPipeFunction<any, any>;

export type TInferPipeInput<GFunctions extends any[]> =
  TupleFirst<GFunctions> extends (input: infer GInput) => any
    ? GInput
    : never;

export type TInferPipeReturn<GFunctions extends any[]> =
  TupleLast<GFunctions> extends (input: any) => infer GReturn
    ? GReturn
    : never;

export type TInferPipeReturnedFunction<GFunctions extends any[]> =
  (input: TInferPipeInput<GFunctions>) => TInferPipeReturn<GFunctions>;


// export type TPipeFunctionsConstraintFulfilled<GFunctions extends TGenericPipeFunction[], GInput> = {
//   empty: true
//   nonEmpty: TupleFirst<GFunctions> extends (input: GInput) => infer GReturn
//     ? TPipeFunctionsConstraintFulfilled<TupleShift<GFunctions>, GReturn>
//     : false
//   infinite: false
// }[
//   GFunctions extends []
//     ? 'empty'
//     : (
//       GFunctions extends (infer Item)[]
//         ? (
//           Item[] extends GFunctions
//             ? 'infinite'
//             : 'nonEmpty'
//           )
//         : never
//       )
//   ];
//
// export type TPipeFunctionsConstraint<GFunctions extends TGenericPipeFunction[]> =
//   TupleFirst<GFunctions> extends (input: infer GInput) => any
//     ? (
//       true extends TPipeFunctionsConstraintFulfilled<GFunctions, GInput>
//         ? TGenericPipeFunction[]
//         : never
//       )
//     : never;

// export type TPipeFunctionsConstraintFulfilled<GFunctions extends TGenericPipeFunction[], GReturn> = {
//   empty: true
//   nonEmpty: TupleLast<GFunctions> extends (input: infer GInput) => GReturn
//     ? TPipeFunctionsConstraintFulfilled<TuplePop<GFunctions>, GInput>
//     : false
//   infinite: false
// }[
//   GFunctions extends []
//     ? 'empty'
//     : (
//       GFunctions extends (infer Item)[]
//         ? (
//           Item[] extends GFunctions
//             ? 'infinite'
//             : 'nonEmpty'
//           )
//         : never
//       )
//   ];
//
// export type TPipeFunctionsConstraint<GFunctions extends TGenericPipeFunction[]> =
//   TupleLast<GFunctions> extends (input: any) => infer GReturn
//     ? (
//       true extends TPipeFunctionsConstraintFulfilled<GFunctions, GReturn>
//         ? TGenericPipeFunction[]
//         : never
//       )
//     : never;

export type TPipeFunctionsConstraintFulfilled<GFunctions extends TGenericPipeFunction[], GInput> = {
  empty: true
  nonEmpty: TupleFirst<GFunctions> extends (input: GInput) => infer GReturn
    ? TPipeFunctionsConstraintFulfilled<TupleShift<GFunctions>, GReturn>
    : {
      ERROR_MESSAGE: 'pipe constraint failed'
      ERROR_FUNCTION: TupleFirst<GFunctions>
    }
  infinite: {
    ERROR_MESSAGE: 'pipe constraint received infinite tuple'
  }
}[
  GFunctions extends []
    ? 'empty'
    : (
      GFunctions extends (infer Item)[]
        ? (
          Item[] extends GFunctions
            ? 'infinite'
            : 'nonEmpty'
          )
        : never
      )
  ];

export type TPipeFunctionsConstraint<GFunctions extends TGenericPipeFunction[]> =
  TupleFirst<GFunctions> extends (input: infer GInput) => any
    ? (
      true extends TPipeFunctionsConstraintFulfilled<GFunctions, GInput>
        ? TGenericPipeFunction[]
        : never
      )
    : never;

// type A = (v: number) => number;
// type B = (v: number) => number;
// type C = (v: string) => number;
// const a: TPipeFunctionsConstraintFulfilled<[A, B], number>; // true
// const a: TPipeFunctionsConstraintFulfilled<[A, C], number>; // false
// const a: TPipeFunctionsConstraintFulfilled<[C, A], string>; // true


// const a: TPipeFunctionsConstraintFulfilled<[A, B], number>; // true
// const a: TPipeFunctionsConstraintFulfilled<[A, C], number>; // false
// const a: TPipeFunctionsConstraintFulfilled<[C, A], number>; // true


function pipe<GFunctions extends TPipeFunctionsConstraint<GFunctions>>(...fns: GFunctions): TInferPipeReturnedFunction<GFunctions> {
  return (input: TInferPipeInput<GFunctions>): TInferPipeReturn<GFunctions> => {
    return fns.reduce((input: any, fn: TGenericFunction) => fn(input), input);
  };
}

// const compose = <GFunctions extends TGenericFunction[]>(...fns: GFunctions) => {
//   return (...args: TInferComposeArgs<GFunctions>): ReturnType<any> => {
//     return fns.reduceRight((y, f) => f(y), x);
//   };
// };


/*----*/

export type TInferCurryRightArgs<GFunction extends TGenericFunction, GArgs extends any[]> =
  Parameters<GFunction> extends [...infer GFirstArgs, ...GArgs]
    ? GFirstArgs
    : never;

export type TCurryRightReturnFunction<GFunction extends TGenericFunction, GArgs extends any[]> =
  (...args: TInferCurryRightArgs<GFunction, GArgs>) => ReturnType<GFunction>;

export function curryRight<GFunction extends TGenericFunction, GArgs extends any[]>(
  fn: GFunction,
  ...args: GArgs
): TCurryRightReturnFunction<GFunction, GArgs> {
  return (..._arg: any) => {
    return fn(..._arg, ...args);
  };
}


/** COMMON **/

export type TAddFunction<A, B, Output> = (a: A, b: B) => Output;

export function NumberAdd(a: number, b: number): number {
  return a + b;
}


export type TArrayMapFunction = <GInput, GOutput>(array: GInput[], mapper: (input: GInput) => GOutput) => GOutput[];
export type TArrayMapFunctionTyped<GInput, GOutput> = (array: GInput[], mapper: (input: GInput) => GOutput) => GOutput[];

export function ArrayMap<GInput, GOutput>(array: GInput[], mapper: (input: GInput) => GOutput): GOutput[] {
  return array.map(mapper);
}



/** DEBUG **/

// https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-20dfb109a1a0
// https://medium.com/javascript-scene/transducers-efficient-data-processing-pipelines-in-javascript-7985330fe73d
// https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983
// https://medium.com/javascript-scene/composing-software-the-book-f31c77fc3ddc

export async function debugCurry1() {
  // const a = curry(NumberAdd);

  NumberAdd(NumberAdd(1, 2), 3);

  // const piped = pipe(
  //   (v: number) => NumberAdd(v, 2),
  //   (v: number) => NumberAdd(v, 3),
  //   (v: number) => v.toString(10),
  //   // (v: number) => NumberAdd(v, 3),
  // );


  const piped = pipe(
    curryRight(ArrayMap as TArrayMapFunctionTyped<number, string>, (v: number) => v.toString(10)),
    curryRight(ArrayMap as TArrayMapFunctionTyped<string, number>, (v: string) => parseFloat(v)),
  );

  const a = piped([1]);
}


export async function debugTrait() {
  await debugCurry1();
  // await debugTrait1();

}
