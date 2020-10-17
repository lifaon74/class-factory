import { TSubtractFunction } from '../built-in/arithmetic/subtract/subtract-function';
import { subtractUsingNegateAndAddRaw } from '../built-in/arithmetic/subtract/subtract-function-using-negate-and-add';
import { TNegateFunction } from '../built-in/arithmetic/negate/negate-function';
import { TAddFunction } from '../built-in/arithmetic/add/add-function';
import { TMultiplyFunction } from '../built-in/arithmetic/multiply/multiply-function';
import { TDivideFunction } from '../built-in/arithmetic/divide/divide-function';
import { TSqrtFunction } from '../built-in/arithmetic/math/sqrt/sqrt-function';
import { TToStringFunction } from '../built-in/others/to-string/to-string-function';

export interface INumberStruct {
  value: number;
}

export const toStringForNumberStruct: TToStringFunction<INumberStruct> = function toStringForNumberStruct(a: INumberStruct): string {
  return a.value.toString(10);
}

export const negateForNumberStruct: TNegateFunction<INumberStruct, INumberStruct> = function negateForNumberStruct(a: INumberStruct): INumberStruct {
  return { value: -a.value };
}

export const addForNumberStruct: TAddFunction<INumberStruct, INumberStruct, INumberStruct> = function addForNumberStruct(a: INumberStruct, b: INumberStruct): INumberStruct {
  return { value: a.value + b.value };
}

// export const subtractForNumberStruct: TSubtractFunction<INumberStruct, INumberStruct, INumberStruct> = function subtractForNumberStruct(a: INumberStruct, b: INumberStruct): INumberStruct {
//   return { value: a.value - b.value };
// }


export const subtractForNumberStruct: TSubtractFunction<INumberStruct, INumberStruct, INumberStruct> = function subtractForNumberStructUsingNegateAndAdd(
  a: INumberStruct,
  b: INumberStruct,
): INumberStruct {
  return subtractUsingNegateAndAddRaw(a, b, negateForNumberStruct, addForNumberStruct);
}

export const multiplyForNumberStruct: TMultiplyFunction<INumberStruct, INumberStruct, INumberStruct> = function multiplyForNumberStruct(a: INumberStruct, b: INumberStruct): INumberStruct {
  return { value: a.value * b.value };
}

export const divideForNumberStruct: TDivideFunction<INumberStruct, INumberStruct, INumberStruct> = function divideForNumberStruct(a: INumberStruct, b: INumberStruct): INumberStruct {
  return { value: a.value / b.value };
}

export const sqrtForNumberStruct: TSqrtFunction<INumberStruct, INumberStruct> = function sqrtForNumberStruct(a: INumberStruct): INumberStruct {
  return { value: Math.sqrt(a.value) };
}

export const numberStructFunctionsCollection = {
  toString: toStringForNumberStruct,
  negate: negateForNumberStruct,
  add: addForNumberStruct,
  subtract: subtractForNumberStruct,
  multiply: multiplyForNumberStruct,
  divide: divideForNumberStruct,
  sqrt: sqrtForNumberStruct,
};



