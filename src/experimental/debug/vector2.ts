import { TraitToString } from '../traits/built-in/others/trait-to-string';
import { NEW, TraitNew } from '../traits/built-in/others/trait-new';
import { TraitSubtract } from '../traits/built-in/arithmetic/trait-subtract/trait-subtract';
import { TraitNegate } from '../traits/built-in/arithmetic/trait-negate';
import {
  callTraitMethodOnObject,
  implementTraits,
  mixTraitsWithConstructorTyping,
  traitIsImplementedBy,
} from '../traits/public';
import { TraitAdd } from '../traits/built-in/arithmetic/trait-add';
import { Trait } from '../traits/trait/trait-class';
import { TraitSubtractUsingAddAndNegate } from '../traits/built-in/arithmetic/trait-subtract/trait-subtract-using-add-and-negate';
import { CallFunction } from '../function-helpers/call-function';

/** Vector2Struct **/

interface IVector2Struct {
  x: number;
  y: number;
}


abstract class TraitVector2StructLength extends Trait {
  length(this: IVector2Struct): number {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }
}

abstract class TraitVector2StructToString extends TraitToString {
  toString(this: IVector2Struct): string {
    return `vec2(${ this.x }, ${ this.y })`;
  }
}

abstract class TraitVector2StructAdd extends TraitAdd<IVector2Struct, IVector2Struct> {
  add(this: IVector2Struct, value: IVector2Struct): IVector2Struct {
    return {
      x: this.x + value.x,
      y: this.y + value.y,
    };
  }
}

abstract class TraitVector2StructAddSelf extends Trait {
  addSelf(this: IVector2Struct, value: IVector2Struct): IVector2Struct {
    this.x += value.x;
    this.y += value.y;
    return this;
  }
}

abstract class TraitVector2StructSubtract extends TraitSubtract<IVector2Struct, IVector2Struct> {
  subtract(this: IVector2Struct, value: IVector2Struct): IVector2Struct {
    return {
      x: this.x - value.x,
      y: this.y - value.y,
    };
  }
}

abstract class TraitVector2StructSubtractUsingAddAndNegate extends TraitSubtractUsingAddAndNegate<IVector2Struct, IVector2Struct> {
  subtract(this: TraitVector2StructAdd, value: TraitVector2StructNegate): IVector2Struct {
    return CallFunction(super.subtract, this, [value]) as IVector2Struct;
  }
}

abstract class TraitVector2StructNegate extends TraitNegate {
  negate(this: IVector2Struct): IVector2Struct {
    return {
      x: -this.x,
      y: -this.y,
    };
  }
}

abstract class TraitVector2StructNormalize extends Trait {
  normalize(this: IVector2Struct): IVector2Struct {
    const length: number = callTraitMethodOnObject(TraitVector2StructLength, 'length', this, []);
    return {
      x: this.x / length,
      y: this.y / length,
    };
  }
}

/** Vector2 **/

interface IVector2 extends IVector2Struct,
  TraitVector2StructLength,
  TraitVector2StructToString,
  TraitVector2New,
  TraitVector2Add,
  TraitVector2StructAddSelf,
  // TraitVector2Subtract,
  TraitVector2SubtractUsingAddAndNegate,
  TraitVector2Negate,
  TraitVector2Normalize {
  addSelf(value: IVector2Struct): this;
}

interface IVector2TraitConstructor {
  new(): IVector2;
}

type TVector2StructAndNew = IVector2Struct & TraitVector2New;

abstract class TraitVector2New extends TraitNew {
  [NEW](data: IVector2Struct): IVector2 {
    return new Vector2(data.x, data.y);
  }
}

abstract class TraitVector2Add extends TraitVector2StructAdd {
  add(this: TVector2StructAndNew, value: IVector2Struct): IVector2 {
    return this[NEW](CallFunction(super.add, this, [value]));
  }
}

abstract class TraitVector2Subtract extends TraitVector2StructSubtract {
  subtract(this: TVector2StructAndNew, value: IVector2Struct): IVector2 {
    return this[NEW](CallFunction(super.subtract, this, [value]));
  }
}

abstract class TraitVector2SubtractUsingAddAndNegate extends TraitVector2StructSubtractUsingAddAndNegate {
  subtract(this: TraitVector2StructAdd, value: TraitVector2StructNegate): IVector2 {
    return this[NEW](CallFunction(super.subtract, this, [value]));
  }
}

abstract class TraitVector2Negate extends TraitVector2StructNegate {
  negate(this: TVector2StructAndNew): IVector2 {
    return this[NEW](CallFunction(super.negate, this,[]));
  }
}

abstract class TraitVector2Normalize extends TraitVector2StructNormalize {
  normalize(this: TVector2StructAndNew): IVector2 {
    return this[NEW](CallFunction(super.normalize, this, []));
  }
}

const Vector2Trait = mixTraitsWithConstructorTyping<IVector2TraitConstructor>([
  TraitVector2StructLength,
  TraitVector2StructToString,
  TraitVector2New,
  TraitVector2Add,
  TraitVector2StructAddSelf,
  TraitVector2Subtract,
  // TraitVector2SubtractUsingAddAndNegate,
  TraitVector2Negate,
  TraitVector2Normalize,
], Trait);


class Vector2 extends Vector2Trait implements IVector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }
}

/*-------------------------*/


export async function debugVector2_1() {
  const vec2 = Object.assign(Object.create(null), { x: 1, y: 1 }); // create an object which inherits from nothing
  // const vec2 = { x: 1, y: 1 }; // NOPE because toString exists on Object.prototype

  // implement the traits on vec2
  implementTraits([TraitVector2StructLength, TraitVector2StructToString], vec2);

  // now vec2 has the method .length()
  console.log(vec2.length()); // 1.41...

  // and .toString()
  console.log(vec2.toString()); // 'vec2(1, 1)'

  console.log(traitIsImplementedBy(TraitVector2StructLength, vec2)); // true
}

export async function debugVector2_2() {
  const vec2 = new Vector2(1, 2);

  console.log(vec2.length()); // 2.236...
  console.log(vec2.add(new Vector2(3, 4)).add(new Vector2(5, 6)).toString()); // vec2(9, 12)

  console.log(vec2.subtract(new Vector2(3, 4)).toString());

  console.log(traitIsImplementedBy(Vector2Trait, vec2)); // true

  console.log(traitIsImplementedBy(TraitVector2Add, vec2)); // true
  console.log(traitIsImplementedBy(TraitVector2StructAdd, vec2)); // true
  console.log(traitIsImplementedBy(TraitAdd, vec2)); // and also true

  // console.log(vec2.normalize().negate().toString());

  (window as any).Vector2 = Vector2;
}

export async function debugVector2() {
  // await debugVector2_1();
  await debugVector2_2();
}
