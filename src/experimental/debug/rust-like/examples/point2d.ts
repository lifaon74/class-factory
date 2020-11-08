import { TraitToString } from '../build-in/others/trait-to-string/trait-to-string';
import { INumberStruct, NumberLike } from './number-like';
import { TInferTraitAddGReturn, TInferTraitAddGValue, TraitAdd } from '../build-in/arithmetic/trait-add/trait-add';
import { TraitAs } from '../build-in/others/trait-as/trait-as';
import { TInferTraitNegateGReturn, TraitNegate } from '../build-in/arithmetic/trait-negate/trait-negate';
import { TraitAlloc } from '../build-in/others/trait-alloc/trait-alloc';
import { TraitSubtract } from '../build-in/arithmetic/trait-subtract/trait-subtract';
import { TraitOutlinePrint } from '../build-in-traits';
import { BigIntLike } from './bigint-like';
import { Impl } from '../core/implementation-decorator';
import { TraitIsImplementedBy } from '../core/trait-is-implemented-by';
import { AssembleTraitImplementations } from '../core/apply-trait-implementation';


/*
struct Point<T> {
    x: T,
    y: T,
}
 */

export interface IPoint2dStruct<T> {
  x: T;
  y: T;
}

export type TInferPoint2dStructType<GPoint2dStruct extends IPoint2dStruct<any>> =
  GPoint2dStruct extends IPoint2dStruct<infer GType>
    ? GType
    : never;

export type IRawPoint2dStruct<GPoint2dStruct extends IPoint2dStruct<any>> = IPoint2dStruct<TInferPoint2dStructType<GPoint2dStruct>>;


/** FOR POINT2D STRUCT **/

@Impl()
export class ImplTraitAsForPoint2dStruct<GSelf extends IPoint2dStruct<any>> extends TraitAs<GSelf> {
}

/*--*/

export type ImplTraitToStringForPoint2dStructGSelfConstraintStructType = TraitToString<any>;

@Impl()
export class ImplTraitToStringForPoint2dStruct<GSelf extends IPoint2dStruct<ImplTraitToStringForPoint2dStructGSelfConstraintStructType>> extends TraitToString<GSelf> {
  toString(this: GSelf): string {
    return `point2d(${ this.x.toString() }, ${ this.y.toString() })`;
  }
}

/*--*/

export type TImplTraitAddForPoint2dStructGSelfConstraintStructType = TraitAdd<any, any, any>;

export type TImplTraitAddForPoint2dStructGSelfConstraint<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TImplTraitAddForPoint2dStructGSelfConstraintStructType>;

export type TImplTraitAddForPoint2dStructGValueStructType<GSelf extends IPoint2dStruct<any>> = TInferTraitAddGValue<TInferPoint2dStructType<GSelf>>;

export type TImplTraitAddForPoint2dStructGValue<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TImplTraitAddForPoint2dStructGValueStructType<GSelf>>;

export type TImplTraitAddForPoint2dStructGReturnStructType<GSelf extends IPoint2dStruct<any>> = TInferTraitAddGReturn<TInferPoint2dStructType<GSelf>>;

export type TImplTraitAddForPoint2dStructGReturn<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TImplTraitAddForPoint2dStructGReturnStructType<GSelf>>;

@Impl()
export class ImplTraitAddForPoint2dStruct<GSelf extends TImplTraitAddForPoint2dStructGSelfConstraint<GSelf>> extends TraitAdd<GSelf, TImplTraitAddForPoint2dStructGValue<GSelf>, TImplTraitAddForPoint2dStructGReturn<GSelf>> {
  add(this: GSelf, value: TImplTraitAddForPoint2dStructGValue<GSelf>): TImplTraitAddForPoint2dStructGReturn<GSelf> {
    return {
      x: this.x.add(value.x),
      y: this.y.add(value.y),
    };
  }
}


/** FOR POINT2D **/

export type TImplTraitNegateForPoint2dGSelfConstraintStructType = TraitNegate<any, any>;

export type TImplTraitNegateForPoint2dGSelfConstraint<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TImplTraitNegateForPoint2dGSelfConstraintStructType>;

export type TImplTraitNegateForPoint2dGReturnStructType<GSelf extends IPoint2dStruct<any>> = AsPoint2dType<TInferTraitNegateGReturn<TInferPoint2dStructType<GSelf>>>;

export type TImplTraitNegateForPoint2dGReturn<GSelf extends IPoint2dStruct<any>> = IPoint2d<TImplTraitNegateForPoint2dGReturnStructType<GSelf>>;


@Impl()
export class ImplTraitNegateForPoint2d<GSelf extends TImplTraitNegateForPoint2dGSelfConstraint<GSelf>> extends TraitNegate<GSelf, TImplTraitNegateForPoint2dGReturn<GSelf>> {
  negate(this: GSelf): TImplTraitNegateForPoint2dGReturn<GSelf> {
    return new Point2d<TImplTraitNegateForPoint2dGReturnStructType<GSelf>>(
      this.x.negate(),
      this.y.negate(),
    );
  }
}

/*--*/

export type TImplTraitAddForPoint2dGSelfConstraintStructType = TraitAdd<any, any, any>;

export type TImplTraitAddForPoint2dGSelfConstraint<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TImplTraitAddForPoint2dGSelfConstraintStructType>;

export type TImplTraitAddForPoint2dGValueStructType<GSelf extends IPoint2dStruct<any>> = TInferTraitAddGValue<TInferPoint2dStructType<GSelf>>;

export type TImplTraitAddForPoint2dGValue<GSelf extends IPoint2dStruct<any>> = IPoint2dStruct<TImplTraitAddForPoint2dGValueStructType<GSelf>>;

export type TImplTraitAddForPoint2dGReturnStructType<GSelf extends IPoint2dStruct<any>> = AsPoint2dType<TInferTraitAddGReturn<TInferPoint2dStructType<GSelf>>>;

export type TImplTraitAddForPoint2dGReturn<GSelf extends IPoint2dStruct<any>> = IPoint2d<TImplTraitAddForPoint2dGReturnStructType<GSelf>>;


@Impl()
export class ImplTraitAddForPoint2d<GSelf extends TImplTraitAddForPoint2dGSelfConstraint<GSelf>> extends TraitAdd<GSelf, TImplTraitAddForPoint2dGValue<GSelf>, TImplTraitAddForPoint2dGReturn<GSelf>> {
  add(this: GSelf, value: TImplTraitAddForPoint2dGValue<GSelf>): TImplTraitAddForPoint2dGReturn<GSelf> {
    return new Point2d<TImplTraitAddForPoint2dGReturnStructType<GSelf>>(
      this.x.add(value.x),
      this.y.add(value.y),
    );
  }
}


/*--*/

export interface TPoint2dType extends ImplTraitToStringForPoint2dStructGSelfConstraintStructType,
  TImplTraitNegateForPoint2dGSelfConstraintStructType,
  TImplTraitAddForPoint2dStructGSelfConstraintStructType
{}

export type AsPoint2dType<GType> =
  GType extends TPoint2dType
    ? GType
    : never

export interface IPoint2d<T extends TPoint2dType> extends IPoint2dStruct<T>,
  ImplTraitAsForPoint2dStruct<IPoint2d<T>>,
  ImplTraitToStringForPoint2dStruct<IPoint2d<T>>,
  ImplTraitNegateForPoint2d<IPoint2d<T>>,
  ImplTraitAddForPoint2d<IPoint2d<T>>
{}

export interface IAssembledPoint2dImplementations {
  new<T extends TPoint2dType>(): IPoint2d<T>;
}

const point2dTraitImplementations = [
  ImplTraitToStringForPoint2dStruct,
  ImplTraitAsForPoint2dStruct,
  ImplTraitNegateForPoint2d,
  ImplTraitAddForPoint2d,
];

const AssembledPoint2dImplementations = AssembleTraitImplementations<IAssembledPoint2dImplementations>(point2dTraitImplementations);

export class Point2d<T extends TPoint2dType> extends AssembledPoint2dImplementations<T> implements Point2d<T> {
  static from<T extends TPoint2dType>(input: IPoint2dStruct<T>): IPoint2d<T> {
    return new Point2d<T>(input.x, input.y);
  }

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


export async function debugTraitRustLikePoint2d() {

  const num1 = new NumberLike(1);
  const num2 = new NumberLike(2);

  const pt1 = new Point2d<NumberLike>(num1, num2);
  const pt2 = new Point2d<NumberLike>(num2, num1);

  console.log(TraitIsImplementedBy(TraitAdd, pt1));
  console.log(TraitIsImplementedBy(TraitSubtract, pt1));
  console.log(TraitIsImplementedBy(TraitOutlinePrint, pt1));

  // console.log(pt1.toString());
  console.log(pt1.add(pt2).negate().toString());
  // console.log(pt1.add(pt2).as<Point2d<NumberLike>>(Point2d.from).negate().toString());
  // // console.log(pt1.subtract(pt2).toString());
  // //
  // // pt1.outlinePrint();
  //
  // const pt3 = new Point2d<BigIntLike>(new BigIntLike(BigInt(1)), new BigIntLike(BigInt(2)));
  // console.log(pt3.add(pt3).toString());
  // console.log(pt3.add(pt3).as(Point2d.from).toString());
  // // console.log(pt1.add(pt2).as<Point2d<BigIntLike>>(Point2d.from));
  //
  // // DONT => unions are forbidden
  // // const pt4 = new Point2d<NumberLike | BigIntLike>(new BigIntLike(BigInt(1)), new NumberLike(2));
  // // console.log(pt4.add(pt1).toString());
  // // console.log(pt1.add(pt4).toString());
}

