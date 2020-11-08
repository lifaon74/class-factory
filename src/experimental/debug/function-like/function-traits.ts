import { pipe, pipeNow } from './pipe';
import { curryRightOneByOne } from './curry';
import { parse } from 'acorn';
// import { generate } from 'escodegen';
// import * as escodegen from 'escodegen';
import {
  ArrowFunctionExpression,
  BaseNode,
  CallExpression,
  ExpressionStatement,
  FunctionDeclaration,
  Identifier,
  Program,
  RestElement,
} from 'estree';
import { generate } from 'astring';
import { addForNumberStruct, INumberStruct, subtractForNumberStruct } from './examples/number-like';
import { debugFunctionTraitPoint } from './examples/point2d';
import { TClassType } from '../../types/class-types';
import { TGenericFunction } from '../../types/function-types';


/*----------------------*/

/** CRAZINESS **/

class GenericType {
  readonly name: string;
  readonly constraints: readonly Struct[];

  constructor(
    name: string,
    constraints: readonly Struct[] = [],
  ) {
    this.name = name;
    this.constraints = Object.freeze(Array.from(constraints));
  }
}

type StructShape = {
  [key: string]: any;
};

class Struct {
  readonly generics: readonly GenericType[];

  constructor(
    name: string,
    generics: Iterable<GenericType> = [],
    shape: StructShape | ((...generics: readonly GenericType[]) => StructShape),
  ) {
    this.generics = Object.freeze(Array.from(generics));
    // this.shape = shape;
  }
}

const PointStruct = new Struct('PointStruct', [new GenericType('T')], (T: GenericType) => {
  return {
    x: T,
    y: T,
  };
});


class Type {
  // readonly of: Struct;
  // readonly generics: readonly (Type | GenericType)[];

  constructor(

  ) {

  }
}

// class TypeDefinition {
//   readonly generics: readonly GenericType[];
//   readonly derivedFrom: Type | null;
//
//   constructor(
//     generics: Iterable<Type> = [],
//     derivedFrom: Type | null = null,
//     shape:
//   ) {
//     this.generics = Object.freeze(Array.from(generics));
//     this.derivedFrom = derivedFrom;
//   }
// }





// class Type {
//   readonly generics: readonly Type[];
//   readonly derivedFrom: Type | null;
//
//   constructor(
//     generics: Iterable<Type> = [],
//     derivedFrom: Type | null = null,
//   ) {
//     this.generics = Object.freeze(Array.from(generics));
//     this.derivedFrom = derivedFrom;
//   }
// }
//
// class TypedValue<GValue, GType extends Type> {
//   readonly value: GValue;
//   readonly type: GType;
//
//   constructor(
//     value: GValue,
//     type: GType,
//   ) {
//     this.value = value;
//     this.type = type;
//   }
//
//   castTo<GNewType extends Type>(newType: GNewType): TypedValue<GValue, GNewType> {
//     return new TypedValue<GValue, GNewType>(this.value, newType);
//   }
// }
//
const NUMBER_TYPE = new Type();

// export function GetTypeOf(
//   input: any
// ) {
//
// }

/*----------------------*/

export type TToStringFunction<GValue> = (a: GValue) => string;

export type TInferToStringFunctionGGValue<GToStringFunction extends TToStringFunction<any>> =
  GToStringFunction extends TToStringFunction<infer GValue>
    ? GValue
    : never;



// export interface IFunction {
//   name: string;
//   argumentTypes: readonly TType[];
//   implementation: TGenericFunction;
// }

type TFunctionOrArgumentsMap = Map<Type | undefined, TFunctionOrArgumentsMap | TGenericFunction>;

const FUNCTIONS = new Map<string, TFunctionOrArgumentsMap>();



export function TypedFunction<GFunction extends TGenericFunction>(
  argumentTypes: readonly Type[],
  fnc: GFunction,
  functionName: string = fnc.name,
): GFunction {
  if (functionName === '') {
    throw new Error(`The function must have a name`);
  } else {
    let functionOrArgumentsMap: TFunctionOrArgumentsMap;
    if (FUNCTIONS.has(functionName)) {
      functionOrArgumentsMap = FUNCTIONS.get(functionName) as TFunctionOrArgumentsMap;
    } else {
      functionOrArgumentsMap = new Map();
      FUNCTIONS.set(functionName, functionOrArgumentsMap);
    }

    for (let i = 0, l = argumentTypes.length; i < l; i ++) {
      const argumentType: Type = argumentTypes[i];
      if (functionOrArgumentsMap.has(argumentType)) {
        functionOrArgumentsMap = functionOrArgumentsMap.get(argumentType) as TFunctionOrArgumentsMap;
      } else {
        const childFunctionOrArgumentsMap = new Map();
        functionOrArgumentsMap.set(argumentType, childFunctionOrArgumentsMap);
        functionOrArgumentsMap = childFunctionOrArgumentsMap;
      }
    }

    if (functionOrArgumentsMap.has(void 0)) {
      console.log(`For arguments: `, argumentTypes);
      console.log(fnc);
      throw new Error(`A similar function as already been registered`);
    } else {
      functionOrArgumentsMap.set(void 0, fnc)
    }
  }
  return fnc;
}

export function GetTypedFunction<GFunction extends TGenericFunction>(
  functionName: string,
  argumentTypes: readonly Type[],
): GFunction | undefined {
  let functionOrArgumentsMap: TFunctionOrArgumentsMap;
  if (FUNCTIONS.has(functionName)) {
    functionOrArgumentsMap = FUNCTIONS.get(functionName) as TFunctionOrArgumentsMap;

    for (let i = 0, l = argumentTypes.length; i < l; i ++) {
      const argumentType: Type = argumentTypes[i];
      if (functionOrArgumentsMap.has(argumentType)) {
        functionOrArgumentsMap = functionOrArgumentsMap.get(argumentType) as TFunctionOrArgumentsMap;
      } else {
        return void 0;
      }
    }

    return functionOrArgumentsMap.get(void 0) as (GFunction | undefined);
  } else {
    return void 0;
  }
}

export function GetTypedFunctionOrThrow<GFunction extends TGenericFunction>(
  functionName: string,
  argumentTypes: readonly Type[],
): GFunction {
  const result: GFunction | undefined = GetTypedFunction<GFunction>(functionName, argumentTypes);
  if (result === void 0) {
    throw new Error(`No function with the name '${ functionName }' and the arguments [${ argumentTypes.map(String).join(', ') }] has been found`);
  } else {
    return result;
  }
}



/*---*/



/*---*/


// const NUMBER_TYPE = Symbol('number-type');

TypedFunction([
  NUMBER_TYPE,
], function toString(a: number): string {
  return a.toString(10);
});



const POINT2D_TYPE = new Type();

interface IPoint2d<T> {
  x: T;
  y: T;
}


TypedFunction([
  POINT2D_TYPE,
], function toString<T>(a: IPoint2d<T>): string {
  return `point2d(${ GetTypedFunctionOrThrow<(a: T) => string>('toString', [a.x]) })`;
});



export async function debugFunctionTraits2() {
  console.log(FUNCTIONS);
  console.log(GetTypedFunction('toString', []));
  console.log(GetTypedFunction('toString', [NUMBER_TYPE]));
}




/*----------------------*/

export async function debugFunctionTraitsPerf() {
  const num1: INumberStruct = { value: 1 };
  const num2: INumberStruct = { value: 2 };
  const num3: INumberStruct = { value: 4 };

  const addCurried = curryRightOneByOne(addForNumberStruct);
  const addCurried2 = (a: INumberStruct) => ((b: INumberStruct) => addForNumberStruct(b, a));
  const subtractCurried = curryRightOneByOne(subtractForNumberStruct);
  const subtractCurried2 = (a: INumberStruct) => ((b: INumberStruct) => subtractForNumberStruct(b, a));

  console.time('perf');
  let j = 0;
  for (let i = 0; i < 1e7; i++) {
    num1.value = Math.random();
    num2.value = Math.random();
    num3.value = Math.random();

    // j = subtract(add(num1, num2), num3).value; // 1e7 => 1275ms

    // j = (pipeNow(
    //   num1,
    //   curryRightOnyByOne(add)(num2),
    //   curryRightOnyByOne(subtract)(num3),
    // ) as any).value; // 1e7 => 6862ms

    // j = (pipeNow(
    //   num1,
    //   addCurried(num2),
    //   subtractCurried(num3),
    // ) as any).value; // 1e7 => 6769ms

    j = (pipeNow(
      num1,
      addCurried2(num2),
      subtractCurried2(num3),
    ) as any).value; // 1e7 => 2125ms

  }
  console.timeEnd('perf');
  console.log(j);
}

export async function debugFunctionTraits1() {
  const num1: INumberStruct = { value: 1 };
  const num2: INumberStruct = { value: 2 };
  const num3: INumberStruct = { value: 4 };

  // 1 + 2 - 3

  console.log('normal', 1 + 2 - 4);

  console.log('function call', subtractForNumberStruct(addForNumberStruct(num1, num2), num3));

  const addCurried = curryRightOneByOne(addForNumberStruct);
  const subtractCurried = curryRightOneByOne(subtractForNumberStruct);

  console.log('curried function call', subtractCurried(num3)(addCurried(num1)(num2)));
  console.log('curried function call', (num1: INumberStruct) => subtractCurried(num3)(addCurried(num1)(num2)));

  const piped = pipe(
    addCurried(num2),
    subtractCurried(num3),
  );

  console.log('pipe', piped(num1));

  console.log('pipeNow', pipeNow(
    num1,
    addCurried(num2),
    subtractCurried(num3),
  ));

  const a = pipeNow(
    num1,
    addCurried(num2),
    subtractCurried(num3),
  );
}

export async function debugFunctionTraitsUnroll() {

  type TEcmaVersion = 'es5' | 'latest';

  function IsPipeNowNode(node: BaseNode): boolean {
    return (node.type === 'CallExpression')
      && ((node as CallExpression).callee.type === 'Identifier')
      && (((node as CallExpression).callee as Identifier).name === 'pipeNow');
  }

  type TCurryRightIdentifier = (node: BaseNode) => boolean;

  function IsCurryRightIdentifier(node: BaseNode): boolean {
    return (node.type === 'Identifier')
      && ((node as Identifier).name === 'curryRight');
  }

  function IsPipeCurryRightNode(
    node: BaseNode,
    isCurryIdentifier: TCurryRightIdentifier,
  ): boolean {
    return (node.type === 'CallExpression')
      && (
        isCurryIdentifier((node as CallExpression).callee)
        || IsPipeCurryRightNode((node as CallExpression).callee, isCurryIdentifier)
      );
  }


  function IsPipeCurryRightOneByOneNode(node: BaseNode): boolean {
    return (node.type === 'CallExpression')
      && ((node as CallExpression).callee.type === 'Identifier')
      && (((node as CallExpression).callee as Identifier).name === 'curryRightOneByOne');
  }

  function IsPipeNode(node: BaseNode): boolean {
    return (node.type === 'CallExpression')
      && ((node as CallExpression).callee.type === 'Identifier')
      && (((node as CallExpression).callee as Identifier).name === 'pipe');
  }

  function uuid() {
    return `${ Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16).padStart(14, '0') }-${ Date.now().toString(16).padStart(12, '0') }`;
  }

  function uuid_var() {
    return `var_${ uuid().replace('-', '_') }`;
  }


  function unrollPipeNowArgs(args: BaseNode[]): CallExpression | BaseNode {
    if (args.length === 1) {
      return args[0];
    } else {
      return {
        type: 'CallExpression',
        callee: args[args.length - 1],
        arguments: [
          unrollPipeNowArgs(args.slice(0, -1)),
        ],
      } as CallExpression;
    }
  }

  function unrollCurryRightArguments(
    node: CallExpression,
    isCurryIdentifier: TCurryRightIdentifier,
  ): BaseNode[] {
    let args: any[];
    if (isCurryIdentifier(node.callee)) {
      args = [];
    } else if (node.callee.type === 'CallExpression') {
      args = unrollCurryRightArguments(node.callee as CallExpression, isCurryIdentifier);
    } else {
      throw new Error(`Not a curryRight`);
    }
    return [
      ...node.arguments,
      ...args,
    ];
  }

  function unrollPipe(node: CallExpression, ecmaVersion: TEcmaVersion = 'latest'): FunctionDeclaration | ArrowFunctionExpression {
    const varName: string = uuid_var();

    const varNode: Identifier = {
      type: 'Identifier',
      name: varName,
    } as Identifier;

    switch (ecmaVersion) {
      case 'latest':
        return {
          type: 'ArrowFunctionExpression',
          id: null,
          expression: true,
          params: [varNode],
          body: unrollPipeNowArgs([
            varNode,
            ...node.arguments,
          ]),
        } as ArrowFunctionExpression;
      default:
        return {
          type: 'FunctionDeclaration',
          id: null,
          params: [varNode],
          body: {
            type: 'BlockStatement',
            body: [{
              type: 'ReturnStatement',
              argument: unrollPipeNowArgs([
                varNode,
                ...node.arguments,
              ]),
            }],
          },
        } as FunctionDeclaration;
    }
  }

  function unrollPipeNow(node: CallExpression): CallExpression | BaseNode {
    console.log(IsPipeNowNode(node));
    return unrollPipeNowArgs(node.arguments as unknown as BaseNode[]);
  }

  function unrollCurryRight(node: CallExpression, ecmaVersion: TEcmaVersion = 'latest') {
    console.log(IsPipeCurryRightNode(node, IsCurryRightIdentifier));
    console.log(node);

    const unrolledArgs = unrollCurryRightArguments(node, IsCurryRightIdentifier);
    console.log(unrolledArgs);

    const varName: string = uuid_var();

    const varNode: Identifier = {
      type: 'Identifier',
      name: varName,
    } as Identifier;

    return {
      type: 'ArrowFunctionExpression',
      id: null,
      expression: true,
      params: [{
        type: 'RestElement',
        argument: varNode,
      } as RestElement],
      body: {
        type: 'CallExpression',
        callee: unrolledArgs[unrolledArgs.length - 1],
        arguments: [
          {
            type: 'SpreadElement',
            argument: varNode,
          },
          ...unrolledArgs.slice(0, -1),
        ],
      } as CallExpression,
    } as ArrowFunctionExpression;
  }

  // const ast: Program = parse(`
  //   pipeNow(
  //     num1,
  //     addCurried(num2),
  //     subtractCurried(num3),
  //   )
  // `, { ecmaVersion: 'latest' }) as unknown as Program;

  // const ast: Program = parse(`
  //   pipe(
  //     addCurried(num2),
  //     subtractCurried(num3),
  //   )
  // `, { ecmaVersion: 'latest' }) as unknown as Program;

  const ast: Program = parse(`
    curryRight(add)(v1, v2)(v3);
  `, { ecmaVersion: 'latest' }) as unknown as Program;


  // const ast2: Program = parse(`
  //   function g(c) { return a(b(c)); }
  // `, { ecmaVersion: 'latest' }) as unknown as Program;

  // const ast2: Program = parse(`
  //   (c) => a(b(c))
  // `, { ecmaVersion: 'latest' }) as unknown as Program;

  // curryRight(add)(v1, v2); => (...args) => add(...args, v1, v2)
  const ast2: Program = parse(`
    (...args) => add(...args, v1, v2)
  `, { ecmaVersion: 'latest' }) as unknown as Program;
  // const ast2: Program = parse(`
  //   function g() { return add.apply(null, Array.from(arguments).concat([v1, v2])); }
  // `, { ecmaVersion: 'latest' }) as unknown as Program;

  // console.log('hello');
  // console.log(ast);
  console.log(ast2);
  // const newAST = unrollPipeNow((ast.body[0] as ExpressionStatement).expression as CallExpression);
  // const newAST = unrollPipe((ast.body[0] as ExpressionStatement).expression as CallExpression);
  const newAST = unrollCurryRight((ast.body[0] as ExpressionStatement).expression as CallExpression);
  console.log(generate(newAST as any));
  // console.log(ast);
}


export async function debugFunctionTraits() {
  await debugFunctionTraits2();
  // await debugFunctionTraitPoint();
  // await debugFunctionTraits1();
  // await debugFunctionTraitsUnroll();
  // await debugFunctionTraitsPerf();
}
