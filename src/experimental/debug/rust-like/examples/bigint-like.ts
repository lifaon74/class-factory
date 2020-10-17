import { AssembleTraitImplementations, Impl } from '../functions';
import { TraitToString } from '../build-in/others/trait-to-string/trait-to-string';
import { ALLOC, TraitAlloc } from '../build-in/others/trait-alloc/trait-alloc';
import { AllocFromThisPrototype } from '../../../traits/built-in/others/trait-alloc/trait-alloc-from-this-prototype';
import { TInferTraitAddGValue, TraitAdd } from '../build-in/arithmetic/trait-add/trait-add';
import { TraitNegate } from '../build-in/arithmetic/trait-negate/trait-negate';
import { TraitSubtractUsingAddAndNegate } from '../build-in/arithmetic/trait-subtract/trait-subtract-using-add-and-negate';
import { TraitSubtract } from '../build-in/arithmetic/trait-subtract/trait-subtract';

/** FAST COPY OF NUMBER LIKE FOR TESTS **/

export interface IBigIntStruct {
  value: bigint;
}

export type TBigIntStructOrBigInt = IBigIntStruct | bigint;

/*--*/

@Impl()
export class ImplTraitToStringForBigInt<GSelf extends IBigIntStruct> extends TraitToString<GSelf> {
  toString(this: GSelf): string {
    return `${ this.value.toString(10) }n`;
  }
}

/*--*/

@Impl()
export class ImplTraitAllocForBigInt<GSelf extends IBigIntStruct> extends TraitAlloc<GSelf, TBigIntStructOrBigInt, GSelf> {
  [ALLOC](this: GSelf, data: TBigIntStructOrBigInt): GSelf {
    const _data: IBigIntStruct = (typeof data === 'bigint')
      ? { value: data }
      : data;
    return AllocFromThisPrototype(this, _data) as GSelf;
  }
}

/*--*/

export type TImplTraitNegateForBigIntGSelfConstraint<GSelf> = IBigIntStruct
  & TraitAlloc<GSelf, IBigIntStruct, GSelf>;

@Impl()
export class ImplTraitNegateForBigInt<GSelf extends TImplTraitNegateForBigIntGSelfConstraint<GSelf>> extends TraitNegate<GSelf, GSelf> {
  negate(this: GSelf): GSelf {
    return this[ALLOC]({
      value: -this.value
    });
  }
}

/*--*/

export type TImplTraitAddForBigIntGSelfConstraint<GSelf> = IBigIntStruct
  & TraitAlloc<GSelf, IBigIntStruct, GSelf>;

@Impl()
export class ImplTraitAddForBigInt<GSelf extends TImplTraitAddForBigIntGSelfConstraint<GSelf>> extends TraitAdd<GSelf, IBigIntStruct, GSelf> {
  add(this: GSelf, value: IBigIntStruct): GSelf {
    return this[ALLOC]({
      value: this.value + value.value
    });
  }
}

/*--*/

export type TImplTraitSubtractForBigIntGSelfConstraint<GSelf> = IBigIntStruct
  & TraitAlloc<GSelf, IBigIntStruct, GSelf>;

@Impl()
export class ImplTraitSubtractForBigInt<GSelf extends TImplTraitSubtractForBigIntGSelfConstraint<GSelf>> extends TraitSubtract<GSelf, IBigIntStruct, GSelf> {
  subtract(this: GSelf, value: IBigIntStruct): GSelf {
    return this[ALLOC]({
      value: this.value - value.value
    });
  }
}

/*--*/

// export type TImplTraitSubtractUsingAddAndNegateForBigIntGValueConstraint<GSelf extends TraitAdd<GSelf, GSelf, GSelf>, GValue> = IBigIntStruct
//   & TraitNegate<GValue, TInferTraitAddGValue<GSelf>>;
// export class ImplTraitSubtractUsingAddAndNegateForBigInt<GSelf extends TImplTraitSubtractUsingAddAndNegateForBigIntGSelfConstraint<GSelf>, GValue extends TImplTraitSubtractUsingAddAndNegateForBigIntGValueConstraint<GSelf, GValue>> extends TraitSubtractUsingAddAndNegate<GSelf, GValue> {


export type TImplTraitSubtractUsingAddAndNegateForBigIntGSelfConstraint<GSelf> = IBigIntStruct
  & TraitAdd<GSelf, GSelf, GSelf>;

export type TImplTraitSubtractUsingAddAndNegateForBigIntGValue<GSelf extends TraitAdd<GSelf, GSelf, GSelf>> = IBigIntStruct
  & TraitNegate<IBigIntStruct, TInferTraitAddGValue<GSelf>>;

@Impl()
export class ImplTraitSubtractUsingAddAndNegateForBigInt<GSelf extends TImplTraitSubtractUsingAddAndNegateForBigIntGSelfConstraint<GSelf>> extends TraitSubtractUsingAddAndNegate<GSelf, TImplTraitSubtractUsingAddAndNegateForBigIntGValue<GSelf>> {
}

/*-----*/


export interface IBigInt extends IBigIntStruct,
  ImplTraitToStringForBigInt<IBigInt>,
  ImplTraitAllocForBigInt<IBigInt>,
  ImplTraitNegateForBigInt<IBigInt>,
  ImplTraitAddForBigInt<IBigInt>,
  ImplTraitSubtractUsingAddAndNegateForBigInt<IBigInt>
  // ImplTraitNegateForBigInt<IBigInt>,
{}

export interface IAssembledBigIntImplementations {
  new(): IBigInt;
}

const AssembledBigIntImplementations = AssembleTraitImplementations<IAssembledBigIntImplementations>([
  ImplTraitToStringForBigInt,
  ImplTraitAllocForBigInt,
  ImplTraitNegateForBigInt,
  ImplTraitAddForBigInt,
  ImplTraitSubtractUsingAddAndNegateForBigInt,
  // ImplTraitNegateForBigInt,
]);

export class BigIntLike extends AssembledBigIntImplementations {
  value: bigint;
  constructor(value: bigint) {
    super();
    this.value = value;
  }
}

/*-----*/

export async function debugTraitBigIntLike() {

  const num1 = new BigIntLike(BigInt(1));
  const num10 = new BigIntLike(BigInt(10));

  console.log(num1.toString());
  console.log(num1.add(num10).negate().toString());
  console.log(num1.add({ value: BigInt(20) }).negate().toString());
  console.log(num1.subtract(num10).negate().toString());
}

