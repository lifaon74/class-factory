// import { debugEventListener } from './examples/event-listener/debug-event-listener';
// import { debugObservable } from './examples/observables/debug';
import { debugTraitIterator } from './examples/iterator/debug-trait-iterator';
import { debugObservable } from './examples/observables/debug-observables';

// https://doc.rust-lang.org/src/core/ops/arith.rs.html
// https://doc.rust-lang.org/book/ch17-03-oo-design-patterns.html
// https://doc.rust-lang.org/book/ch19-03-advanced-traits.html


/*
struct Point2d<T> {
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
impl Add for Point2d {
    type Output = Point2d;

    fn add(self, other: Point2d) -> Point2d {
        Point2d {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}
// specifies the self type => equiv: this: type
 */

/*
impl<T: Add<Output = T>> Add for Point2d<T> {
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


/*------------ POINT2D -----------*/


// /*
// struct Point<T> {
//     x: T,
//     y: T,
// }
//  */
//
// export interface IPoint2dStruct<T> {
//   x: T;
//   y: T;
// }
//
// export type TInferPoint2dStructType<GPoint2dStruct extends IPoint2dStruct<any>> =
//   GPoint2dStruct extends IPoint2dStruct<infer GType>
//     ? GType
//     : never;
//
// export type IRawPoint2dStruct<GPoint2dStruct extends IPoint2dStruct<any>> = IPoint2dStruct<TInferPoint2dStructType<GPoint2dStruct>>;
//
// /*-----*/
//
// @Impl()
// export class ImplTraitAsForPoint2dStruct<GSelf extends IPoint2dStruct<any>> extends TraitAs<GSelf> {
// }
//
// export interface IPoint2dStructWithAs<T> extends IPoint2dStruct<T>,
//   ImplTraitAsForPoint2dStruct<IPoint2dStructWithAs<T>>
// {
// }
//
// export interface IAssembledPoint2dStructWithAsImplementations {
//   new<T>(): IPoint2dStructWithAs<T>;
// }
//
// const point2dStructWithAsTraitImplementations = [
//   ImplTraitAsForPoint2dStruct,
// ];
//
// const AssembledPoint2dStructWithAsImplementations = AssembleTraitImplementations<IAssembledPoint2dStructWithAsImplementations>(point2dStructWithAsTraitImplementations);
//
// export class Point2dStructWithAs<T> extends AssembledPoint2dStructWithAsImplementations<T> implements IPoint2dStructWithAs<T> {
//   x: T;
//   y: T;
//
//   constructor(
//     x: T,
//     y: T,
//   ) {
//     super();
//     this.x = x;
//     this.y = y;
//   }
// }
//
// /*-----*/
//
// /** IMPL TO STRING **/
//
// @Impl()
// export class ImplTraitToStringForPoint2d<GSelf extends IPoint2dStruct<any>> extends TraitToString<GSelf> {
//   toString(this: GSelf): string {
//     return `point2d(${ this.x }, ${ this.y })`;
//   }
// }
//
// /** IMPL ALLOC **/
//
// // @Impl()
// // export class ImplTraitAllocForPoint2d<GSelf extends IPoint2dStruct<any>> extends TraitAlloc<GSelf, IRawPoint2dStruct<GSelf>, GSelf> {
// //   [ALLOC](this: GSelf, data: IRawPoint2dStruct<GSelf>): GSelf {
// //     return AllocFromThisPrototype(this, data) as GSelf;
// //   }
// // }
//
// @Impl()
// export class ImplTraitAllocForPoint2d<GSelf extends IPoint2dStruct<any>> extends TraitAlloc<GSelf, IPoint2dStruct<unknown>, IPoint2d<any>> {
//   [ALLOC]<T extends TPoint2dType<T>>(this: GSelf, data: IPoint2dStruct<T>): IPoint2d<T> {
//     return new Point2d<T>(data.x, data.y);
//   }
// }
//
// /** IMPL ADD **/
//
// /*
// impl<T: Add<Output = T>> Add for Point2d<T> {
//     type Output = Self;
//
//     fn add(self, other: Self) -> Self::Output {
//         Self {
//             x: self.x + other.x,
//             y: self.y + other.y,
//         }
//     }
// }
// */
//
//
// /**
//  * returns IPoint2dStruct
//  * accurate typing
//  * ADVANTAGES: most accurate typing, fast
//  * LIMITS: not user friendly to chain methods
//  */
//
// // export type TImplTraitAddForPoint2dStructGSelfConstraintStructType = TraitAdd<any, any, any>;
// //
// // export type TImplTraitAddForPoint2dStructGSelfConstraint<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TImplTraitAddForPoint2dStructGSelfConstraintStructType>;
// //
// // export type TImplTraitAddForPoint2dStructGValueStructType<GSelf extends IPoint2dStruct<any>> = TInferTraitAddGValue<TInferPoint2dStructType<GSelf>>;
// //
// // export type TImplTraitAddForPoint2dStructGValue<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TImplTraitAddForPoint2dStructGValueStructType<GSelf>>;
// //
// // export type TImplTraitAddForPoint2dStructGReturnStructType<GSelf extends IPoint2dStruct<any>> = TInferTraitAddGReturn<TInferPoint2dStructType<GSelf>>;
// //
// // export type TImplTraitAddForPoint2dStructGReturn<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TImplTraitAddForPoint2dStructGReturnStructType<GSelf>>;
// //
// // @Impl()
// // export class ImplTraitAddForPoint2dStruct<GSelf extends TImplTraitAddForPoint2dStructGSelfConstraint<GSelf>> extends TraitAdd<GSelf, TImplTraitAddForPoint2dStructGValue<GSelf>, TImplTraitAddForPoint2dStructGReturn<GSelf>> {
// //   add(this: GSelf, value: TImplTraitAddForPoint2dStructGValue<GSelf>): TImplTraitAddForPoint2dStructGReturn<GSelf> {
// //     return {
// //       x: this.x.add(value.x),
// //       y: this.y.add(value.y),
// //     };
// //   }
// // }
//
// /**
//  * returns IPoint2dStructWithAs
//  * accurate typing
//  * ADVANTAGES: provides an easy way to cast and chain methods; works for any kind of child classes
//  * LIMITS: less user friendly than directly returning the type; slower
//  */
// export type TImplTraitAddForPoint2dStructGSelfConstraintStructType = TraitAdd<any, any, any>;
//
// export type TImplTraitAddForPoint2dStructGSelfConstraint<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TImplTraitAddForPoint2dStructGSelfConstraintStructType>;
//
// export type TImplTraitAddForPoint2dStructGValueStructType<GSelf extends IPoint2dStruct<any>> = TInferTraitAddGValue<TInferPoint2dStructType<GSelf>>;
//
// export type TImplTraitAddForPoint2dStructGValue<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TImplTraitAddForPoint2dStructGValueStructType<GSelf>>;
//
// export type TImplTraitAddForPoint2dStructGReturnStructType<GSelf extends IPoint2dStruct<any>> = TInferTraitAddGReturn<TInferPoint2dStructType<GSelf>>;
//
// export type TImplTraitAddForPoint2dStructGReturn<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TImplTraitAddForPoint2dStructGReturnStructType<GSelf>>
//   & TraitAs<any>;
//
// @Impl()
// export class ImplTraitAddForPoint2dStruct<GSelf extends TImplTraitAddForPoint2dStructGSelfConstraint<GSelf>> extends TraitAdd<GSelf, TImplTraitAddForPoint2dStructGValue<GSelf>, TImplTraitAddForPoint2dStructGReturn<GSelf>> {
//   add(this: GSelf, value: TImplTraitAddForPoint2dStructGValue<GSelf>): TImplTraitAddForPoint2dStructGReturn<GSelf> {
//     return new Point2dStructWithAs(
//       this.x.add(value.x),
//       this.y.add(value.y),
//     );
//   }
// }
//
//
//
// /**
//  * returns IPoint2d
//  * accurate typing
//  * ADVANTAGES: directly chainable methods; fast
//  * LIMITS: must reimplement methods if we extends from IPoint2d
//  */
//
// export type TImplTraitAddForPoint2dGSelfConstraintStructType = TraitAdd<any, any, any>;
//
//
// export type TImplTraitAddForPoint2dGSelfConstraint<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TImplTraitAddForPoint2dGSelfConstraintStructType>;
//
// export type TImplTraitAddForPoint2dGValueStructType<GSelf extends IPoint2dStruct<any>> = TInferTraitAddGValue<TInferPoint2dStructType<GSelf>>;
//
// export type TImplTraitAddForPoint2dGValue<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TImplTraitAddForPoint2dGValueStructType<GSelf>>;
//
// export type TImplTraitAddForPoint2dGReturnStructType<GSelf extends IPoint2dStruct<any>> = AsPoint2dType<TInferTraitAddGReturn<TInferPoint2dStructType<GSelf>>>;
//
// export type TImplTraitAddForPoint2dGReturn<GSelf extends IPoint2dStruct<any>> = IPoint2d<TImplTraitAddForPoint2dGReturnStructType<GSelf>>;
//
//
// @Impl()
// export class ImplTraitAddForPoint2d<GSelf extends TImplTraitAddForPoint2dGSelfConstraint<GSelf>> extends TraitAdd<GSelf, TImplTraitAddForPoint2dGValue<GSelf>, TImplTraitAddForPoint2dGReturn<GSelf>> {
//   add(this: GSelf, value: TImplTraitAddForPoint2dGValue<GSelf>): TImplTraitAddForPoint2dGReturn<GSelf> {
//     return new Point2d<TImplTraitAddForPoint2dGReturnStructType<GSelf>>(
//       this.x.add(value.x),
//       this.y.add(value.y),
//     );
//   }
// }
//
//
// /**
//  * returns IPoint2d
//  * use ALLOC
//  * accurate typing
//  * ADVANTAGES: directly chainable methods
//  * LIMITS: must reimplement methods if we extends from IPoint2d
//  */
//
// // export type TImplTraitAddForPoint2dGSelfConstraintStructType = TraitAdd<any, any, any>;
// //
// // export type TImplTraitAddForPoint2dGSelfConstraintAllocType<GSelf extends IPoint2dStruct<any>> = ImplTraitAllocForPoint2d<GSelf>;
// //
// // export type TImplTraitAddForPoint2dGSelfConstraint<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TImplTraitAddForPoint2dGSelfConstraintStructType>
// //   & TImplTraitAddForPoint2dGSelfConstraintAllocType<GSelf>;
// //
// // export type TImplTraitAddForPoint2dGValueStructType<GSelf extends IPoint2dStruct<any>> = TInferTraitAddGValue<TInferPoint2dStructType<GSelf>>;
// //
// // export type TImplTraitAddForPoint2dGValue<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TImplTraitAddForPoint2dGValueStructType<GSelf>>;
// //
// // export type TImplTraitAddForPoint2dGReturnStructType<GSelf extends IPoint2dStruct<any>> = AsPoint2dType<TInferTraitAddGReturn<TInferPoint2dStructType<GSelf>>>;
// //
// // export type TImplTraitAddForPoint2dGReturn<GSelf extends IPoint2dStruct<any>> = IPoint2d<TImplTraitAddForPoint2dGReturnStructType<GSelf>>;
// //
// //
// // @Impl()
// // export class ImplTraitAddForPoint2d<GSelf extends TImplTraitAddForPoint2dGSelfConstraint<GSelf>> extends TraitAdd<GSelf, TImplTraitAddForPoint2dGValue<GSelf>, TImplTraitAddForPoint2dGReturn<GSelf>> {
// //   add(this: GSelf, value: TImplTraitAddForPoint2dGValue<GSelf>): TImplTraitAddForPoint2dGReturn<GSelf> {
// //     return this[ALLOC]<TImplTraitAddForPoint2dGReturnStructType<GSelf>>({
// //       x: this.x.add(value.x),
// //       y: this.y.add(value.y),
// //     });
// //   }
// // }
//
//
//
// /** IMPL NEGATE **/
//
// export type TImplTraitNegateForPoint2dGSelfConstraint<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TraitNegate<any, TInferPoint2dStructType<GSelf>>>
//   & TraitAlloc<GSelf, IRawPoint2dStruct<GSelf>, GSelf>;
//
// @Impl()
// export class ImplTraitNegateForPoint2d<GSelf extends TImplTraitNegateForPoint2dGSelfConstraint<GSelf>> extends TraitNegate<GSelf, GSelf> {
//   negate(this: GSelf): GSelf {
//     return this[ALLOC]({
//       x: this.x.negate(),
//       y: this.y.negate(),
//     });
//   }
// }
//
//
//
// /** IMPL SUBTRACT **/
//
// export type TImplTraitSubtractUsingAddAndNegateForPoint2dGSelfConstraint<GSelf> = IPoint2dStruct<any>
//   & TraitAdd<GSelf, GSelf, GSelf>;
//
// export type TImplTraitSubtractUsingAddAndNegateForPoint2dGValue<GSelf extends TraitAdd<GSelf, GSelf, GSelf>> = IPoint2dStruct<any>
//   & TraitNegate<IPoint2dStruct<any>, TInferTraitAddGValue<GSelf>>;
//
// @Impl()
// export class ImplTraitSubtractUsingAddAndNegateForPoint2d<GSelf extends TImplTraitSubtractUsingAddAndNegateForPoint2dGSelfConstraint<GSelf>> extends TraitSubtractUsingAddAndNegate<GSelf, TImplTraitSubtractUsingAddAndNegateForPoint2dGValue<GSelf>> {
// }
//
//
//
// /** IMPL OUTLINE PRINT **/
//
// /*
// impl fmt::Display for Point2d {
//     fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
//         write!(f, "({}, {})", self.x, self.y)
//     }
// }
//  */
//
// export type TImplTraitOutlinePrintForPoint2dGSelfConstraint<GSelf> = IPoint2dStruct<any>
//   & TraitToString<GSelf>;
//
// @Impl()
// export class ImplTraitOutlinePrintForPoint2d<GSelf extends TImplTraitOutlinePrintForPoint2dGSelfConstraint<GSelf>> extends TraitOutlinePrint<GSelf> {
// }
//
//
// /* EXTRA */
//
// /*----*/
//
// // export interface TPoint2dType extends TraitAdd<any, any, any>, TraitNegate<any, unknown> {
// // }
//
// export interface TPoint2dType<T> extends TImplTraitAddForPoint2dStructGSelfConstraintStructType, TraitNegate<T, T> {
// }
//
// export type AsPoint2dType<GType> =
//   GType extends TPoint2dType<any>
//     ? GType
//     : never
//
// export interface IPoint2d<T extends TPoint2dType<T>> extends IPoint2dStruct<T>,
//   ImplTraitToStringForPoint2d<IPoint2d<T>>,
//   ImplTraitAllocForPoint2d<IPoint2d<T>>,
//   ImplTraitAddForPoint2dStruct<IPoint2d<T>>,
//   ImplTraitNegateForPoint2d<IPoint2d<T>>
//   // ImplTraitSubtractUsingAddAndNegateForPoint2d<IPoint2d<T>>,
//   // ImplTraitOutlinePrintForPoint2d<IPoint2d<T>>
// {
//
// }
//
// export interface IAssembledPoint2dImplementations {
//   new<T extends TPoint2dType<T>>(): IPoint2d<T>;
// }
//
// const point2dTraitImplementations = [
//   ImplTraitToStringForPoint2d,
//   ImplTraitAllocForPoint2d,
//   ImplTraitAddForPoint2dStruct,
//   ImplTraitNegateForPoint2d,
//   ImplTraitSubtractUsingAddAndNegateForPoint2d,
//   ImplTraitOutlinePrintForPoint2d,
// ];
//
// const AssembledPoint2dImplementations = AssembleTraitImplementations<IAssembledPoint2dImplementations>(point2dTraitImplementations);
//
// export class Point2d<T extends TPoint2dType<T>> extends AssembledPoint2dImplementations<T> implements Point2d<T> {
//   static from<T extends TPoint2dType<T>>(input: IPoint2dStruct<T>): IPoint2d<T> {
//     return new Point2d<T>(input.x, input.y);
//   }
//
//   x: T;
//   y: T;
//
//   constructor(
//     x: T,
//     y: T,
//   ) {
//     super();
//     this.x = x;
//     this.y = y;
//   }
// }
//
//
// /*-------------------*/
//
// // https://doc.rust-lang.org/stable/rust-by-example/generics.html
//
// export async function debugTraitRustLikePoint2d() {
//
//   const num1 = new NumberLike(1);
//   const num2 = new NumberLike(2);
//
//   const pt1 = new Point2d<NumberLike>(num1, num2);
//   const pt2 = new Point2d<NumberLike>(num2, num1);
//
//   console.log(TraitIsImplementedBy(TraitAlloc, pt1));
//   console.log(TraitIsImplementedBy(TraitSubtract, pt1));
//   console.log(TraitIsImplementedBy(TraitOutlinePrint, pt1));
//
//   console.log(pt1.toString());
//   // console.log(pt1.add(pt2).negate().toString());
//   console.log(pt1.add(pt2).as<Point2d<NumberLike>>(Point2d.from).negate().toString());
//   // console.log(pt1.subtract(pt2).toString());
//   //
//   // pt1.outlinePrint();
//
//   const pt3 = new Point2d<BigIntLike>(new BigIntLike(BigInt(1)), new BigIntLike(BigInt(2)));
//   console.log(pt3.add(pt3).toString());
//   console.log(pt3.add(pt3).as(Point2d.from).toString());
//   // console.log(pt1.add(pt2).as<Point2d<BigIntLike>>(Point2d.from));
//
//   // DONT => unions are forbidden
//   // const pt4 = new Point2d<NumberLike | BigIntLike>(new BigIntLike(BigInt(1)), new NumberLike(2));
//   // console.log(pt4.add(pt1).toString());
//   // console.log(pt1.add(pt4).toString());
// }
//
// //
//
// /*-------------------*/
//
// export interface IVector2Struct<T> extends IPoint2dStruct<T> {
// }
//
// export type TInferVector2StructType<GPoint2dStruct extends IVector2Struct<any>> =
//   GPoint2dStruct extends IVector2Struct<infer GType>
//     ? GType
//     : unknown;
//
//
// @Impl()
// export class ImplTraitToStringForVector2<GSelf extends IVector2Struct<any>> extends TraitToString<GSelf> {
//   toString(this: GSelf): string {
//     return `vec2(${ this.x }, ${ this.y })`;
//   }
// }
//
//
// /*--*/
//
// @Trait()
// export abstract class TraitVectorLength<GSelf, GReturn> {
//   abstract length(this: GSelf): GReturn;
// }
//
// export type TInferTraitVectorLengthGReturn<GTrait extends TraitVectorLength<any, any>> =
//   GTrait extends TraitVectorLength<any, infer GReturn>
//     ? GReturn
//     : never;
//
// export type TImplTraitVectorLengthForVector2TypeAdd = TraitAdd<any, TImplTraitVectorLengthForVector2TypeMultiply, TraitSqrt<any, any>>;
// export type TImplTraitVectorLengthForVector2TypeMultiply = TraitMultiply<any, TImplTraitVectorLengthForVector2TypeMultiply, TImplTraitVectorLengthForVector2TypeAdd>;
// // export type TImplTraitVectorLengthForVector2TypeMultiply = TraitMultiply<any, any, TImplTraitVectorLengthForVector2TypeAdd>;
// // export type TImplTraitVectorLengthForVector2Type = TImplTraitVectorLengthForVector2TypeMultiply;
// // export type TImplTraitVectorLengthForVector2Type = TraitMultiply<any, any, TraitAdd<any, any, TraitSqrt<any, any>>>;
// // export type TImplTraitVectorLengthForVector2Type = TraitMultiply<any, unknown, TraitAdd<any, unknown, TraitSqrt<any, unknown>>>;
// export type TImplTraitVectorLengthForVector2Type<T> = TraitMultiply<T, T, TraitAdd<T, T, TraitSqrt<T, any>>>;
// // export type TImplTraitVectorLengthForVector2GSelfConstraint<GSelf extends IVector2Struct<any>> = IVector2Struct<TImplTraitVectorLengthForVector2Type>;
//
// // export type TImplTraitVectorLengthForVector2GSelfConstraint<GSelf extends IVector2Struct<any>> = IVector2Struct<TraitMultiply<any, TInferVector2StructType<GSelf>, TraitAdd<any, TInferTraitMultiplyGReturn<TInferVector2StructType<GSelf>>, TraitSqrt<any, any>>>>;
// // export type TImplTraitVectorLengthForVector2GSelfConstraint<GSelf extends IVector2Struct<any>> = IVector2Struct<TraitMultiply<any, TInferVector2StructType<GSelf>, TraitAdd<any, TInferVector2StructType<GSelf>, TraitSqrt<any, any>>>>;
// export type TImplTraitVectorLengthForVector2GSelfConstraint<GSelf extends IVector2Struct<any>> = IVector2Struct<TImplTraitVectorLengthForVector2Type<TInferVector2StructType<GSelf>>>;
//
// export type TImplTraitVectorLengthForVector2GReturn<GSelf> =
//   GSelf extends IVector2Struct<TraitMultiply<any, any, TraitAdd<any, any, TraitSqrt<any, infer GReturn>>>>
//     ? GReturn
//     : never;
//
// @Impl()
// export class ImplTraitVectorLengthForVector2<GSelf extends TImplTraitVectorLengthForVector2GSelfConstraint<GSelf>> extends TraitVectorLength<GSelf, TImplTraitVectorLengthForVector2GReturn<GSelf>> {
//   length(this: GSelf): TImplTraitVectorLengthForVector2GReturn<GSelf> {
//     throw 'TODO';
//     // return this.x.multiply(this.x as any)
//     //   .add(this.y.multiply(this.y as any) as any)
//     //   .sqrt() as any;
//     // return this.x.multiply(this.x)
//     //   .add(this.y.multiply(this.y))
//     //   .sqrt();
//   }
// }
//
// /*--*/
//
// @Trait()
// export abstract class TraitVectorNormalize<GSelf, GReturn> {
//   abstract normalize(this: GSelf): GReturn;
// }
//
// // export type TImplTraitNegateForPoint2dGSelfConstraint<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TraitNegate<any, any>>
// //   & TraitAlloc<GSelf, IRawPoint2dStruct<GSelf>, GSelf>;
// //
// // @Impl()
// // export class ImplTraitNegateForPoint2d<GSelf extends TImplTraitNegateForPoint2dGSelfConstraint<GSelf>> extends TraitNegate<GSelf, GSelf> {
// //   negate(this: GSelf): GSelf {
// //     return this[ALLOC]({
// //       x: this.x.negate(),
// //       y: this.y.negate(),
// //     });
// //   }
// // }
//
// // export type TImplTraitVectorNormalizeForVector2GSelfConstraint<GSelf extends IPoint2dStruct<any>> = IVector2Struct<TraitDivide<any, any>>
// //   & TraitAlloc<GSelf, IRawPoint2dStruct<GSelf>, GSelf>
// //   & TraitVectorLength<GSelf, TInferTraitDivideGReturn<TInferVector2StructType<GSelf>>>;
//
// // TODO continue here: actually, chaining types is a pretty complex task
// // export type TImplTraitVectorNormalizeForVector2GSelfConstraint<GSelf extends IVector2Struct<any> & TraitVectorLength<any, any>> = IVector2Struct<TraitDivide<any, TInferTraitVectorLengthGReturn<GSelf>, any>>
// //   & TraitAlloc<GSelf, IRawPoint2dStruct<GSelf>, GSelf>
// //   & TraitVectorLength<GSelf, TInferTraitDivideGReturn<TInferVector2StructType<GSelf>>>;
// //
// // @Impl()
// // export class ImplTraitVectorNormalizeForVector2<GSelf extends TImplTraitVectorNormalizeForVector2GSelfConstraint<GSelf>> extends TraitVectorNormalize<GSelf, GSelf> {
// //   normalize(this: GSelf): GSelf {
// //     const length: TInferTraitDivideGReturn<TInferVector2StructType<GSelf>> = this.length();
// //     return this[ALLOC]({
// //       x: this.x.divide(length),
// //       y: this.y.divide(length),
// //     });
// //   }
// // }
//
//
// /*--*/
//
// export interface TVector2Type<T> extends TPoint2dType<T>, TImplTraitVectorLengthForVector2Type<T> {
// }
//
// export interface IVector2<T extends TVector2Type<T>> extends Omit<IPoint2d<T>, 'toString'>,
//   ImplTraitToStringForVector2<IVector2<T>>,
//   ImplTraitVectorLengthForVector2<IVector2<T>>
// {
// }
//
// export interface IAssembledVector2Implementations {
//   new<T extends TVector2Type<T>>(): IVector2<T>;
// }
//
//
// const AssembledVector2Implementations = AssembleTraitImplementations<IAssembledVector2Implementations>(
//   OverrideTraitImplementations(point2dTraitImplementations, [
//     ImplTraitToStringForVector2,
//     ImplTraitVectorLengthForVector2,
//   ])
// );
//
// export class Vector2<T extends TVector2Type<T>> extends AssembledVector2Implementations<T> implements Vector2<T> {
//   x: T;
//   y: T;
//
//   constructor(
//     x: T,
//     y: T,
//   ) {
//     super();
//     this.x = x;
//     this.y = y;
//   }
// }
//
// /*------------*/
//
// export async function debugTraitRustLikeVector2() {
//   const num1 = new NumberLike(1);
//   const num2 = new NumberLike(2);
//
//   const vec1 = new Vector2<NumberLike>(num1, num2);
//   const vec2 = new Vector2<NumberLike>(num2, num1);
//
//   console.log(TraitIsImplementedBy(TraitAlloc, vec1));
//   console.log(TraitIsImplementedBy(TraitSubtract, vec1));
//   console.log(TraitIsImplementedBy(TraitOutlinePrint, vec1));
//
//   console.log(vec1.toString());
//   console.log(vec1.add(vec2).negate().toString());
//   // console.log(vec1.subtract(vec2).toString());
//   console.log(vec1.length());
// }
//
// /*------------*/
//


export async function debugTraitRustLike() {
  // await debugTraitNumberLike();
  // await debugTraitBigIntLike();
  // await debugTraitRustLikePoint2d();
  // await debugTraitIterator();
  await debugObservable();
  // await debugEventListener();
  // await debugTraitRustLikeVector2();
}
