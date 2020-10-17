import { AssembleTraitImplementations, Impl } from '../functions';
import { TraitToString } from '../build-in/others/trait-to-string/trait-to-string';
import { ALLOC, TraitAlloc } from '../build-in/others/trait-alloc/trait-alloc';
import { AllocFromThisPrototype } from '../../../traits/built-in/others/trait-alloc/trait-alloc-from-this-prototype';
import { TInferTraitAddGValue, TraitAdd } from '../build-in/arithmetic/trait-add/trait-add';
import { TraitNegate } from '../build-in/arithmetic/trait-negate/trait-negate';
import { TraitSubtractUsingAddAndNegate } from '../build-in/arithmetic/trait-subtract/trait-subtract-using-add-and-negate';
import { TraitSubtract } from '../build-in/arithmetic/trait-subtract/trait-subtract';
import { TraitMultiply } from '../build-in/arithmetic/trait-multiply/trait-multiply';
import { TraitSqrt } from '../build-in/arithmetic/math/trait-sqrt/trait-sqrt';
import { TraitDivide } from '../build-in/arithmetic/trait-divide/trait-divide';

export interface INumberStruct {
  value: number;
}

export type TNumberStructOrNumber = INumberStruct | number;

/*--*/

@Impl()
export class ImplTraitToStringForNumber<GSelf extends INumberStruct> extends TraitToString<GSelf> {
  toString(this: GSelf): string {
    return this.value.toString(10);
  }
}

/*--*/

@Impl()
export class ImplTraitAllocForNumber<GSelf extends INumberStruct> extends TraitAlloc<GSelf, TNumberStructOrNumber, GSelf> {
  [ALLOC](this: GSelf, data: TNumberStructOrNumber): GSelf {
    const _data: INumberStruct = (typeof data === 'number')
      ? { value: data }
      : data;
    return AllocFromThisPrototype(this, _data) as GSelf;
  }
}

/*--*/

export type TImplTraitNegateForNumberGSelfConstraint<GSelf> = INumberStruct
  & TraitAlloc<GSelf, INumberStruct, GSelf>;

@Impl()
export class ImplTraitNegateForNumber<GSelf extends TImplTraitNegateForNumberGSelfConstraint<GSelf>> extends TraitNegate<GSelf, GSelf> {
  negate(this: GSelf): GSelf {
    return this[ALLOC]({
      value: -this.value
    });
  }
}

/*--*/

export type TImplTraitAddForNumberGSelfConstraint<GSelf> = INumberStruct
  & TraitAlloc<GSelf, INumberStruct, GSelf>;

@Impl()
export class ImplTraitAddForNumber<GSelf extends TImplTraitAddForNumberGSelfConstraint<GSelf>> extends TraitAdd<GSelf, INumberStruct, GSelf> {
  add(this: GSelf, value: INumberStruct): GSelf {
    return this[ALLOC]({
      value: this.value + value.value
    });
  }
}

/*--*/

export type TImplTraitSubtractForNumberGSelfConstraint<GSelf> = INumberStruct
  & TraitAlloc<GSelf, INumberStruct, GSelf>;

@Impl()
export class ImplTraitSubtractForNumber<GSelf extends TImplTraitSubtractForNumberGSelfConstraint<GSelf>> extends TraitSubtract<GSelf, INumberStruct, GSelf> {
  subtract(this: GSelf, value: INumberStruct): GSelf {
    return this[ALLOC]({
      value: this.value - value.value
    });
  }
}

/*--*/

// export type TImplTraitSubtractUsingAddAndNegateForNumberGValueConstraint<GSelf extends TraitAdd<GSelf, GSelf, GSelf>, GValue> = INumberStruct
//   & TraitNegate<GValue, TInferTraitAddGValue<GSelf>>;
// export class ImplTraitSubtractUsingAddAndNegateForNumber<GSelf extends TImplTraitSubtractUsingAddAndNegateForNumberGSelfConstraint<GSelf>, GValue extends TImplTraitSubtractUsingAddAndNegateForNumberGValueConstraint<GSelf, GValue>> extends TraitSubtractUsingAddAndNegate<GSelf, GValue> {


export type TImplTraitSubtractUsingAddAndNegateForNumberGSelfConstraint<GSelf> = INumberStruct
  & TraitAdd<GSelf, GSelf, GSelf>;

export type TImplTraitSubtractUsingAddAndNegateForNumberGValue<GSelf extends TraitAdd<GSelf, GSelf, GSelf>> = INumberStruct
  & TraitNegate<INumberStruct, TInferTraitAddGValue<GSelf>>;

@Impl()
export class ImplTraitSubtractUsingAddAndNegateForNumber<GSelf extends TImplTraitSubtractUsingAddAndNegateForNumberGSelfConstraint<GSelf>> extends TraitSubtractUsingAddAndNegate<GSelf, TImplTraitSubtractUsingAddAndNegateForNumberGValue<GSelf>> {
}

/*--*/

export type TImplTraitMultiplyForNumberGSelfConstraint<GSelf> = INumberStruct
  & TraitAlloc<GSelf, INumberStruct, GSelf>;

@Impl()
export class ImplTraitMultiplyForNumber<GSelf extends TImplTraitMultiplyForNumberGSelfConstraint<GSelf>> extends TraitMultiply<GSelf, INumberStruct, GSelf> {
  multiply(this: GSelf, value: INumberStruct): GSelf {
    return this[ALLOC]({
      value: this.value * value.value
    });
  }
}

/*--*/

export type TImplTraitDivideForNumberGSelfConstraint<GSelf> = INumberStruct
  & TraitAlloc<GSelf, INumberStruct, GSelf>;

@Impl()
export class ImplTraitDivideForNumber<GSelf extends TImplTraitDivideForNumberGSelfConstraint<GSelf>> extends TraitDivide<GSelf, INumberStruct, GSelf> {
  divide(this: GSelf, value: INumberStruct): GSelf {
    return this[ALLOC]({
      value: this.value / value.value
    });
  }
}

/*--*/

export type TImplTraitSqrtForNumberGSelfConstraint<GSelf> = INumberStruct
  & TraitAlloc<GSelf, INumberStruct, GSelf>;

@Impl()
export class ImplTraitSqrtForNumber<GSelf extends TImplTraitSqrtForNumberGSelfConstraint<GSelf>> extends TraitSqrt<GSelf, GSelf> {
  sqrt(this: GSelf): GSelf {
    return this[ALLOC]({
      value: Math.sqrt(this.value)
    });
  }
}


/*-----*/


export interface INumber extends INumberStruct,
  ImplTraitToStringForNumber<INumber>,
  ImplTraitAllocForNumber<INumber>,
  ImplTraitNegateForNumber<INumber>,
  ImplTraitAddForNumber<INumber>,
  // ImplTraitSubtractForNumber<INumber>,
  ImplTraitSubtractUsingAddAndNegateForNumber<INumber>,
  ImplTraitMultiplyForNumber<INumber>,
  ImplTraitSqrtForNumber<INumber>
{}

export interface IAssembledNumberImplementations {
  new(): INumber;
}

const AssembledNumberImplementations = AssembleTraitImplementations<IAssembledNumberImplementations>([
  ImplTraitToStringForNumber,
  ImplTraitAllocForNumber,
  ImplTraitNegateForNumber,
  ImplTraitAddForNumber,
  // ImplTraitSubtractForNumber,
  ImplTraitSubtractUsingAddAndNegateForNumber,
  ImplTraitMultiplyForNumber,
  ImplTraitSqrtForNumber,
]);

export class NumberLike extends AssembledNumberImplementations implements INumber {
  value: number;
  constructor(value: number) {
    super();
    this.value = value;
  }
}

/*-----*/

export async function debugTraitNumberLike() {

  const num1 = new NumberLike(1);
  const num10 = new NumberLike(10);

  console.log(num1.toString());
  console.log(num1.add(num10).negate().toString());
  console.log(num1.add({ value: 20 }).negate().toString());
  console.log(num1.subtract(num10).negate().toString());
  console.log(num1.multiply(num10).sqrt().toString());
}

