import { INumberStruct } from './number-like';
import { TToStringFunction, TToStringMethod } from '../built-in/others/to-string/to-string-function';
import { TAddMethod } from '../built-in/arithmetic/add/add-function';

export interface IPoint2dStruct<T> {
  x: T;
  y: T;
}

// export const toStringForPoint2dStruct: TToStringFunction<IPoint2dStruct<any>> = function toStringForPoint2dStruct<T>(
export function toStringForPoint2dStruct<T>(
  point: IPoint2dStruct<T>,
  functions: TToStringMethod<T>
): string {
  return `point2(${ functions.toString(point.x) }, ${ functions.toString(point.y) })`;
}

/*------------------------*/

export async function debugFunctionTraitPoint() {

  const num1: INumberStruct = { value: 1 };
  const num2: INumberStruct = { value: 2 };

  const pt1: IPoint2dStruct<INumberStruct> = { x: num1, y: num2 };
  const pt2: IPoint2dStruct<INumberStruct> = { x: num2, y: num1 };

  // console.log(pt1.toString());
  // console.log(pt1.add(pt2).negate().toString());
  // console.log(pt1.subtract(pt2).toString());
  //
  // pt1.outlinePrint();
  //
  // const pt3 = new Point<BigIntLike>(new BigIntLike(BigInt(1)), new BigIntLike(BigInt(2)));
  // console.log(pt3.add(pt3).toString());

  // DONT => unions are forbidden
  // const pt4 = new Point<NumberLike | BigIntLike>(new BigIntLike(BigInt(1)), new NumberLike(2));
  // console.log(pt4.add(pt1).toString());
  // console.log(pt1.add(pt4).toString());
}

