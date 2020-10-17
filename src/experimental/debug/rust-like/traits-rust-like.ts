import { AllocFromThisPrototype } from '../../traits/built-in/others/trait-alloc/trait-alloc-from-this-prototype';
import {
  AssembleTraitImplementations,
  Impl,
  OverrideTraitImplementations,
  Trait,
  TraitIsImplementedBy,
} from './functions';
import { TraitOutlinePrint } from './build-in-traits';
import { TInferTraitAddGValue, TraitAdd } from './build-in/arithmetic/trait-add/trait-add';
import { ALLOC, TraitAlloc } from './build-in/others/trait-alloc/trait-alloc';
import { TraitSubtract } from './build-in/arithmetic/trait-subtract/trait-subtract';
import { TraitNegate } from './build-in/arithmetic/trait-negate/trait-negate';
import { TraitSubtractUsingAddAndNegate } from './build-in/arithmetic/trait-subtract/trait-subtract-using-add-and-negate';
import { TraitToString } from './build-in/others/trait-to-string/trait-to-string';
import { NumberLike } from './examples/number-like';
import { BigIntLike } from './examples/bigint-like';
import { TInferTraitMultiplyGReturn, TraitMultiply } from './build-in/arithmetic/trait-multiply/trait-multiply';
import { TraitSqrt } from './build-in/arithmetic/math/trait-sqrt/trait-sqrt';
import { TInferTraitDivideGReturn, TraitDivide } from './build-in/arithmetic/trait-divide/trait-divide';

// https://doc.rust-lang.org/src/core/ops/arith.rs.html
// https://doc.rust-lang.org/book/ch17-03-oo-design-patterns.html
// https://doc.rust-lang.org/book/ch19-03-advanced-traits.html


/*
struct Point<T> {
    x: T,
    y: T,
}
 */

/*
trait Add<Rhs=Self> {
    type Output;

    fn add(self, rhs: Rhs) -> Self::Output;
}
 */

/*
impl Add for Point {
    type Output = Point;

    fn add(self, other: Point) -> Point {
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}
// specifies the self type => equiv: this: type
 */

/*
impl<T: Add<Output = T>> Add for Point<T> {
    type Output = Self;

    fn add(self, other: Self) -> Self::Output {
        Self {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}
*/


/*
trait OutlinePrint: fmt::Display {
    fn outline_print(&self) {
        let output = self.to_string();
        let len = output.len();
        println!("{}", "*".repeat(len + 4));
        println!("*{}*", " ".repeat(len + 2));
        println!("* {} *", output);
        println!("*{}*", " ".repeat(len + 2));
        println!("{}", "*".repeat(len + 4));
    }
}
*/



/*------------ POINT -----------*/



/*
struct Point<T> {
    x: T,
    y: T,
}
 */

export interface IPointStruct<T> {
  x: T;
  y: T;
}

export type TInferPointStructType<GPointStruct extends IPointStruct<any>> =
  GPointStruct extends IPointStruct<infer GType>
    ? GType
    : never;

export type IRawPointStruct<GPointStruct extends IPointStruct<any>> = IPointStruct<TInferPointStructType<GPointStruct>>;


/** IMPL TO STRING **/

@Impl()
export class ImplTraitToStringForPoint<GSelf extends IPointStruct<any>> extends TraitToString<GSelf> {
  toString(this: GSelf): string {
    return `point(${ this.x }, ${ this.y })`;
  }
}

/** IMPL ALLOC **/

@Impl()
export class ImplTraitAllocForPoint<GSelf extends IPointStruct<any>> extends TraitAlloc<GSelf, IRawPointStruct<GSelf>, GSelf> {
  [ALLOC](this: GSelf, data: IRawPointStruct<GSelf>): GSelf {
    return AllocFromThisPrototype(this, data) as GSelf;
  }
}


/** IMPL ADD **/

/*
impl<T: Add<Output = T>> Add for Point<T> {
    type Output = Self;

    fn add(self, other: Self) -> Self::Output {
        Self {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}
*/

export type TImplTraitAddForPointGSelfConstraint<GSelf extends IPointStruct<any>> = IPointStruct<TraitAdd<any, any, any>>
  & TraitAlloc<GSelf, IRawPointStruct<GSelf>, GSelf>;

// export type TImplTraitAddForPointGValue<GSelf extends IPointStruct<any>> = IPointStruct<TInferTraitAddGValue<TInferPointStructType<GSelf>>>;
export type TImplTraitAddForPointGValue<GSelf extends IPointStruct<any>> = IRawPointStruct<GSelf>;

@Impl()
export class ImplTraitAddForPoint<GSelf extends TImplTraitAddForPointGSelfConstraint<GSelf>> extends TraitAdd<GSelf, TImplTraitAddForPointGValue<GSelf>, GSelf> {
  add(this: GSelf, value: TImplTraitAddForPointGValue<GSelf>): GSelf {
    return this[ALLOC]({
      x: this.x.add(value.x),
      y: this.y.add(value.y),
    });
  }
}

/** IMPL NEGATE **/

export type TImplTraitNegateForPointGSelfConstraint<GSelf extends IPointStruct<any>> = IPointStruct<TraitNegate<any, any>>
  & TraitAlloc<GSelf, IRawPointStruct<GSelf>, GSelf>;

@Impl()
export class ImplTraitNegateForPoint<GSelf extends TImplTraitNegateForPointGSelfConstraint<GSelf>> extends TraitNegate<GSelf, GSelf> {
  negate(this: GSelf): GSelf {
    return this[ALLOC]({
      x: this.x.negate(),
      y: this.y.negate(),
    });
  }
}



/** IMPL SUBTRACT **/

export type TImplTraitSubtractUsingAddAndNegateForPointGSelfConstraint<GSelf> = IPointStruct<any>
  & TraitAdd<GSelf, GSelf, GSelf>;

export type TImplTraitSubtractUsingAddAndNegateForPointGValue<GSelf extends TraitAdd<GSelf, GSelf, GSelf>> = IPointStruct<any>
  & TraitNegate<IPointStruct<any>, TInferTraitAddGValue<GSelf>>;

@Impl()
export class ImplTraitSubtractUsingAddAndNegateForPoint<GSelf extends TImplTraitSubtractUsingAddAndNegateForPointGSelfConstraint<GSelf>> extends TraitSubtractUsingAddAndNegate<GSelf, TImplTraitSubtractUsingAddAndNegateForPointGValue<GSelf>> {
}



/** IMPL OUTLINE PRINT **/

/*
impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}
 */

export type TImplTraitOutlinePrintForPointGSelfConstraint<GSelf> = IPointStruct<any>
  & TraitToString<GSelf>;

@Impl()
export class ImplTraitOutlinePrintForPoint<GSelf extends TImplTraitOutlinePrintForPointGSelfConstraint<GSelf>> extends TraitOutlinePrint<GSelf> {
}


/* EXTRA */

/*----*/

export interface TPointType extends TraitAdd<any, any, unknown>, TraitNegate<any, unknown> {
}


export interface IPoint<T extends TPointType> extends IPointStruct<T>,
  ImplTraitToStringForPoint<IPoint<T>>,
  ImplTraitAllocForPoint<IPoint<T>>,
  ImplTraitAddForPoint<IPoint<T>>,
  ImplTraitNegateForPoint<IPoint<T>>,
  ImplTraitSubtractUsingAddAndNegateForPoint<IPoint<T>>,
  ImplTraitOutlinePrintForPoint<IPoint<T>>
{

}

export interface IAssembledPointImplementations {
  new<T extends TPointType>(): IPoint<T>;
}

const pointTraitImplementations = [
  ImplTraitToStringForPoint,
  ImplTraitAllocForPoint,
  ImplTraitAddForPoint,
  ImplTraitNegateForPoint,
  ImplTraitSubtractUsingAddAndNegateForPoint,
  ImplTraitOutlinePrintForPoint,
];

const AssembledPointImplementations = AssembleTraitImplementations<IAssembledPointImplementations>(pointTraitImplementations);

export class Point<T extends TPointType> extends AssembledPointImplementations<T> implements Point<T> {
  x: T;
  y: T;

  constructor(
    x: T,
    y: T,
  ) {
    super();
    this.x = x;
    this.y = y;
  }
}


/*-------------------*/


export async function debugTraitRustLikePoint() {

  const num1 = new NumberLike(1);
  const num2 = new NumberLike(2);

  const pt1 = new Point<NumberLike>(num1, num2);
  const pt2 = new Point<NumberLike>(num2, num1);

  console.log(TraitIsImplementedBy(TraitAlloc, pt1));
  console.log(TraitIsImplementedBy(TraitSubtract, pt1));
  console.log(TraitIsImplementedBy(TraitOutlinePrint, pt1));

  console.log(pt1.toString());
  console.log(pt1.add(pt2).negate().toString());
  console.log(pt1.subtract(pt2).toString());

  pt1.outlinePrint();

  const pt3 = new Point<BigIntLike>(new BigIntLike(BigInt(1)), new BigIntLike(BigInt(2)));
  console.log(pt3.add(pt3).toString());

  // DONT => unions are forbidden
  // const pt4 = new Point<NumberLike | BigIntLike>(new BigIntLike(BigInt(1)), new NumberLike(2));
  // console.log(pt4.add(pt1).toString());
  // console.log(pt1.add(pt4).toString());
}



/*-------------------*/

export interface IVector2Struct<T> extends IPointStruct<T> {
}

export type TInferVector2StructType<GPointStruct extends IVector2Struct<any>> =
  GPointStruct extends IVector2Struct<infer GType>
    ? GType
    : unknown;


@Impl()
export class ImplTraitToStringForVector2<GSelf extends IVector2Struct<any>> extends TraitToString<GSelf> {
  toString(this: GSelf): string {
    return `vec2(${ this.x }, ${ this.y })`;
  }
}


/*--*/

@Trait()
export abstract class TraitVectorLength<GSelf, GReturn> {
  abstract length(this: GSelf): GReturn;
}

export type TInferTraitVectorLengthGReturn<GTrait extends TraitVectorLength<any, any>> =
  GTrait extends TraitVectorLength<any, infer GReturn>
    ? GReturn
    : never;

export type TImplTraitVectorLengthForVector2TypeAdd = TraitAdd<any, TImplTraitVectorLengthForVector2TypeMultiply, TraitSqrt<any, any>>;
export type TImplTraitVectorLengthForVector2TypeMultiply = TraitMultiply<any, TImplTraitVectorLengthForVector2TypeMultiply, TImplTraitVectorLengthForVector2TypeAdd>;
// export type TImplTraitVectorLengthForVector2TypeMultiply = TraitMultiply<any, any, TImplTraitVectorLengthForVector2TypeAdd>;
// export type TImplTraitVectorLengthForVector2Type = TImplTraitVectorLengthForVector2TypeMultiply;
// export type TImplTraitVectorLengthForVector2Type = TraitMultiply<any, any, TraitAdd<any, any, TraitSqrt<any, any>>>;
export type TImplTraitVectorLengthForVector2Type = TraitMultiply<any, unknown, TraitAdd<any, unknown, TraitSqrt<any, unknown>>>;
// export type TImplTraitVectorLengthForVector2GSelfConstraint<GSelf extends IVector2Struct<any>> = IVector2Struct<TImplTraitVectorLengthForVector2Type>;

export type TImplTraitVectorLengthForVector2GSelfConstraint<GSelf extends IVector2Struct<any>> = IVector2Struct<TraitMultiply<any, TInferVector2StructType<GSelf>, TraitAdd<any, TInferTraitMultiplyGReturn<TInferVector2StructType<GSelf>>, TraitSqrt<any, any>>>>;

export type TImplTraitVectorLengthForVector2GReturn<GSelf> =
  GSelf extends IVector2Struct<TraitMultiply<any, any, TraitAdd<any, any, TraitSqrt<any, infer GReturn>>>>
    ? GReturn
    : never;

@Impl()
export class ImplTraitVectorLengthForVector2<GSelf extends TImplTraitVectorLengthForVector2GSelfConstraint<GSelf>> extends TraitVectorLength<GSelf, TImplTraitVectorLengthForVector2GReturn<GSelf>> {
  length(this: GSelf): TImplTraitVectorLengthForVector2GReturn<GSelf> {
    return this.x.multiply(this.x as any)
      .add(this.y.multiply(this.y as any) as any)
      .sqrt();
    // return this.x.multiply(this.x)
    //   .add(this.y.multiply(this.y))
    //   .sqrt();
  }
}

/*--*/

@Trait()
export abstract class TraitVectorNormalize<GSelf, GReturn> {
  abstract normalize(this: GSelf): GReturn;
}

// export type TImplTraitNegateForPointGSelfConstraint<GSelf extends IPointStruct<any>> = IPointStruct<TraitNegate<any, any>>
//   & TraitAlloc<GSelf, IRawPointStruct<GSelf>, GSelf>;
//
// @Impl()
// export class ImplTraitNegateForPoint<GSelf extends TImplTraitNegateForPointGSelfConstraint<GSelf>> extends TraitNegate<GSelf, GSelf> {
//   negate(this: GSelf): GSelf {
//     return this[ALLOC]({
//       x: this.x.negate(),
//       y: this.y.negate(),
//     });
//   }
// }

// export type TImplTraitVectorNormalizeForVector2GSelfConstraint<GSelf extends IPointStruct<any>> = IVector2Struct<TraitDivide<any, any>>
//   & TraitAlloc<GSelf, IRawPointStruct<GSelf>, GSelf>
//   & TraitVectorLength<GSelf, TInferTraitDivideGReturn<TInferVector2StructType<GSelf>>>;

// TODO continue here: actually, chaining types is a pretty complex task
export type TImplTraitVectorNormalizeForVector2GSelfConstraint<GSelf extends IVector2Struct<any> & TraitVectorLength<any, any>> = IVector2Struct<TraitDivide<any, TInferTraitVectorLengthGReturn<GSelf>, any>>
  & TraitAlloc<GSelf, IRawPointStruct<GSelf>, GSelf>
  & TraitVectorLength<GSelf, TInferTraitDivideGReturn<TInferVector2StructType<GSelf>>>;

@Impl()
export class ImplTraitVectorNormalizeForVector2<GSelf extends TImplTraitVectorNormalizeForVector2GSelfConstraint<GSelf>> extends TraitVectorNormalize<GSelf, GSelf> {
  normalize(this: GSelf): GSelf {
    const length: TInferTraitDivideGReturn<TInferVector2StructType<GSelf>> = this.length();
    return this[ALLOC]({
      x: this.x.divide(length),
      y: this.y.divide(length),
    });
  }
}


/*--*/

export interface TVector2Type extends TPointType, TImplTraitVectorLengthForVector2Type {
}

export interface IVector2<T extends TVector2Type> extends Omit<IPoint<T>, 'toString'>,
  ImplTraitToStringForVector2<IVector2<T>>,
  ImplTraitVectorLengthForVector2<IVector2<T>>
{
}

export interface IAssembledVector2Implementations {
  new<T extends TVector2Type>(): IVector2<T>;
}


const AssembledVector2Implementations = AssembleTraitImplementations<IAssembledVector2Implementations>(
  OverrideTraitImplementations(pointTraitImplementations, [
    ImplTraitToStringForVector2,
    ImplTraitVectorLengthForVector2,
  ])
);

export class Vector2<T extends TVector2Type> extends AssembledVector2Implementations<T> implements Vector2<T> {
  x: T;
  y: T;

  constructor(
    x: T,
    y: T,
  ) {
    super();
    this.x = x;
    this.y = y;
  }
}

/*------------*/

export async function debugTraitRustLikeVector2() {
  const num1 = new NumberLike(1);
  const num2 = new NumberLike(2);

  const vec1 = new Vector2<NumberLike>(num1, num2);
  const vec2 = new Vector2<NumberLike>(num2, num1);

  console.log(TraitIsImplementedBy(TraitAlloc, vec1));
  console.log(TraitIsImplementedBy(TraitSubtract, vec1));
  console.log(TraitIsImplementedBy(TraitOutlinePrint, vec1));

  console.log(vec1.toString());
  console.log(vec1.add(vec2).negate().toString());
  console.log(vec1.subtract(vec2).toString());
  console.log(vec1.length());
}

/*------------*/




export async function debugTraitRustLike() {
  // await debugTraitNumberLike();
  // await debugTraitBigIntLike();
  // await debugTraitRustLikePoint();
  await debugTraitRustLikeVector2();
}
