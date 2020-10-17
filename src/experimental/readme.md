
## Traits

A trait is a collection of methods that can be implemented on any data type (usually objects or classes).

It doesn't have any internal state (attributes), instead it may only use properties from the object which implements this trait and own methods.

It is intended to reduce some limitations of single inheritance by enabling developers to reuse sets of methods freely in several independent classes living in different class hierarchies.


## Motivation

Javascript is a really flexible language:
classes inheritance works with prototypes which allows us to do practically everything in OO,
but touching directly the `prototype` is usually hazardous, hard to read and understand, very verbose,
and is not an easy task when you want to create a proper class (at least for new js developers).

There came ES6, which introduced classes and helped a lot to manage the constructor, properties, methods and inheritance.
It's a far better, easier, and more legible way to work that the previous `prototype` approach.

Sadly ES6 classes doesn't permit multi inheritance, nor sharing identical methods accros many classes.

In some cases (mostly when you build a library for other developers), multi inheritance is required.
For this, two common workaround exist:

- `Mixins` are classes with a potential internal state, constructor, etc... => you copy their properties on your child classes
    - limits:
        - shared properties may conflict (especially prefixed private ones like `_attribute`)
        - the constructor may return a different `this`, meaning different `this` accros parent mixins, resulting in invalid properties assignation
        - you need to keep track of which mixins you've implemented on your classes if you need something similar to `instanceof`
- `Factories` are functions returning a class having its own state and methods and extending a base class
=> you chain your factories to build your final class
    - it solves the problem of the `this` we've seen with mixins
    - but... every other problems remain (conflict on properties, instanceof, etc...)


I explored intensely both of these solutions, writing many libraries using these patterns, but each time, I faced their limits and was not totally satisfied.

In my mind, I wanted something able to share methods across multiple classes, avoiding code duplication sometimes,
and the possibility to implement only the methods I need, reducing drastically the final build
(ex: if someone doesn't use the method `doSomething()`, then it should not be part of the class, meaning not in the final script)
=> something like the legos: you build yourself your classes based on bricks (here: methods).

---

Other languages like *rust*, *php*, or many others have found a solution to this: `Traits`

I'll speak more about *rust* traits because I find their approach very elegant:

- on one side, you have the data: a structure with properties which contains some data and nothing else
- on the other side, you have the traits: a collection of methods. It may be specialized for a specific structure of data, or kept generic.

Then, you tell the program that your data structure implements `traitA`, `traitB`, etc...
and when you write `data.someMethod().anotherMethod()` it somehow does `anotherMethod(someMethod(data))`.
It's important to note that the data doesn't carry the methods, like javascript class instances does with the prototype chain.

At the end, it's very different of our traditional OO approach with classes, inheritance, etc... but it's actually very cleaver.

I wanted to have the same possibilities on javascript, I wrote a POC.


## Example: Vector2

#### Data structure

Let me introduce you to this lib through an example: building a library able to manipulate vectors (in 2D space)

First we need a `structure` to store the data of a vector:

```ts
interface IVector2Struct {
  x: number;
  y: number;
}
```

Note that our structure is simply an object. It may be a plain object `{ x: 1, y: 2 }`, or the instance of a class `Vector2` for example.

---

Then lets create our first trait: `TraitVector2StructLength`

```ts
abstract class TraitVector2StructLength extends Trait {
  // most of the time you will provide a type for the `this` of the method,
  // ensuring that the method only works with a specific data structure, here: IVector2Struct
  length(this: IVector2Struct): number {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }
}
```

A trait has the following constraint:

- **it must contain only methods** - the state come from the object invoking the method, not from the trait.
- **it must not have any constructor** - because you cannot construct a trait (call `new`).
- **it must be an abstract class** - to inform TypeScript that it's not constructible.
- **it must inherit from `Trait`** - this is used as a remainder that this class is a Trait, and helps TypeScript to report errors.
- **abstract methods are forbidden** - you must implement all the methods,
meaning they must be present on the prototype of the trait. Hopefully, there is a simple workaround:


```ts
abstract class TraitToString extends Trait {
  toString(): string {
    throw new Error(`Cannot call abstract method 'toString'`);
  }
}
```

If you want abstract methods, you have to throw an error at runtime (it will append if someone tries to invoke the method without a child implementation).
Sadly typescript doesn't provide a way to render the abstract methods in the final script, they are just removed. 

---

Now lets see how traits can inherit one from each other:

```ts
abstract class TraitVector2StructToString extends TraitToString {
  toString(this: IVector2Struct): string {
    return `vec2(${ this.x }, ${ this.y })`;
  }
}
```

`TraitToString` is a built-in (provided) trait, that we've seen right upper.
Any data which implements the `TraitVector2ToString` will implement too `TraitToString`

---

Finally, we will implement our traits on a plain object:

```ts
const vec2 = Object.assign(Object.create(null), { x: 1, y: 1 }); // create an object which inherits from nothing
// const vec2 = { x: 1, y: 1 }; // NOPE because toString exists on Object.prototype

// implement the traits on vec2
implementTraits([TraitVector2StructLength, TraitVector2StructToString], vec2);

// now vec2 has the method .length()
console.log(vec2.length()); // 1.41...

// and .toString()
console.log(vec2.toString()); // 'vec2(1, 1)'
```

**INFO:** note that a trait may be implemented only if the object doesn't already contain methods with the same name
(except if the trait is a child trait of an already implemented one).


How can we know that a trait is implemented by an object ?

```ts
console.log(
  traitIsImplementedBy(TraitVector2StructLength, vec2)
); // true
```

---

#### Class

We've seen the basics, but **this is not the most elegant and efficient way to use the traits**:
creating raw object and implementing our traits each time we create a new `vec2` is not performant at all.

Instead, we will create a class which inherits from our traits: `Vector2`

First we will define some interfaces:

```ts
interface IVector2 extends IVector2Struct,
  TraitVector2StructLength,
  TraitVector2StructToString,
// these traits will be defined in a few moments
  TraitVector2New,
  TraitVector2Add {
}

interface IVector2TraitConstructor {
  new(): IVector2;
}

interface IVector2Constructor {
  new(x: number, y: number): IVector2;
}
```

Then we will focus on an `add` method for the IVector2Struct:

```ts
abstract class TraitVector2StructAdd extends TraitAdd {
  add(this: IVector2Struct, value: IVector2Struct): IVector2Struct {
    return {
      x: this.x + value.x,
      y: this.y + value.y,
    };
  }
}
```

At this, point you probably want to return an `IVector2` instead of just a `IVector2Struct`.
This would allow us to chain our methods.
In this case, we may be tempted to write something like this:

```ts
abstract class TraitVector2Add extends TraitVector2StructAdd {
  add(this: IVector2Struct, value: IVector2Struct): IVector2 {
    const vec2 = super.add(value);
    return new Vector2(vec2.x, vec2.y); // DONT
  }
}
```

However, it creates an inconspicuous problem:
what if I create a `SuperVector2` class which extends `Vector2` ? => I'll have to re-write each method which return new instances,
else I'll get only `Vector2` instead of `SuperVector2` instances

To solution this issue, we will use `TraitNew`:

```ts
abstract class TraitVector2New extends TraitNew {
  [NEW](data: IVector2Struct): IVector2 {
    return new Vector2(data.x, data.y);
  }
}
```

...and adapt our `TraitVector2Add`:

```ts
abstract class TraitVector2Add extends TraitVector2StructAdd {
  add(this: IVector2Struct & TraitVector2New, value: IVector2Struct): IVector2 {
    return this[NEW](super.add.call(this, value));
  }
}
```

This is a little more verbose, but it allows us to create new instances based on a trait instead of a class,
meaning classes extending our `Vector2` will just have to override the `[NEW]` method.

Last steps:


```ts
// we combine our traits in a child trait
const Vector2Trait = mixTraitsWithConstructorTyping<IVector2TraitConstructor>([
  TraitVector2StructLength,
  TraitVector2StructToString,
  TraitVector2New,
  TraitVector2Add,
], Trait);
```

```ts
// and we create a Vector2 class
class Vector2 extends Vector2Trait implements IVector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }
}
```

Finally, lets test its:

```ts
const vec2 = new Vector2(1, 2);

console.log(vec2.length()); // 2.236...
console.log(vec2.add(new Vector2(3, 4)).add(new Vector2(5, 6)).toString()); // vec2(9, 12)


console.log(traitIsImplementedBy(Vector2Trait, vec2)); // true

console.log(traitIsImplementedBy(TraitVector2Add, vec2)); // true
console.log(traitIsImplementedBy(TraitVector2StructAdd, vec2)); // true
console.log(traitIsImplementedBy(TraitAdd, vec2)); // and also true
```

// TODO source file link
