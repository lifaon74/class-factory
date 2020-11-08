
## Traits

A trait is a collection of methods that can be implemented on any data type (usually objects or classes).

It doesn't have any internal state (attributes), instead it may only use properties from the object which implements this trait and own methods.

It is intended to reduce some limitations of single inheritance by enabling developers to reuse sets of methods freely in several independent classes living in different class hierarchies.

## For who ?

**Try or use them if**:

- you want to provide a well-defined and very strong typed library, based on classes
- you want reusable methods across various classes, and mixins and factories are not enough for you
- you want to share your lib piece by piece and let the user choose which part they want (allows very efficient tree shacking and minification)
- you want to hide the internal logic of your classes

**Don't use them if**:

- you aim for fast code: traits are more verbose, and require strict typing to be more efficient.
- your code is not a library (ex: ux, component, server script, etc.)

Traits enforce you to code in a very strict manner, which is perfect for library authors requiring a strict framework and typing
to avoid errors and bugs (of course completed by tests). It's important when they are sometimes shared with millions of users.
In another hand, Trais are not recommended for typical organization work (building ux component, application, etc...).

## Motivation

Javascript is a really flexible language:
classes inheritance works with prototypes which allows us to do practically everything in OO,
but working directly with the `prototype` is usually hazardous, hard to read and understand, very verbose,
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
and the possibility to implement only the methods I needed, reducing drastically the final build
(ex: if someone doesn't use the method `doSomething()`, then it should not be part of the class, meaning not in the final script)
=> something like the legos: you build yourself your classes based on bricks (here: methods).

---

Other languages like *rust*, *php*, or many others have found a solution to this: `Traits`

I'll speak more about [rust traits](https://doc.rust-lang.org/book/ch10-02-traits.html) because I find their approach very elegant:

- on one side, you have the data: a structure with properties which contains some data and nothing else
- on the other side, you have the traits: a collection of methods. It may be specialized for a specific structure of data, or kept generic.

Then, you tell the program that your data structure implements `traitA`, `traitB`, etc...
and when you write `data.someMethod().anotherMethod()` it somehow does `anotherMethod(someMethod(data))`.
It's important to note that *the data doesn't carry the methods* (as opposed to javascript, where class instances have methods from the prototype chain),
instead the functions are revolved by the types.

At the end, it's very different of our traditional OO approach with classes, inheritance, etc... but it's actually very cleaver.

I wanted to have the same possibilities on javascript, so I wrote a POC in Typescript (works too in javascript, but typing is pretty important for Traits).



## Example: NumberLike

Let me introduce you to this lib through an example: building a wrapper around a number.
This example is probably useless in itself, but it's very simple and perfect to learn Traits.

#### Trait

As seen earlier, a Trait is simply a collection of methods.

The basic operations on numbers are: `+ - / *`. We will create some Traits for them:

```ts
@Trait()
export abstract class TraitAdd<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract add(this: GSelf, value: GValue): GReturn;
}
```

A Trait has the following constraints:

- **it must have the `Trait` decorator** - this is used to register this class as a Trait.
- **it must be an abstract class** - a trait is not constructible, so **it must not have any constructor** neither.
- **it must contain only methods** - the state come from the object invoking the method, not from the trait.

`TraitAdd` may be a little confusing, so let's clarify it:

In most of the cases, you want your Traits to be as must generic as possible.
For example, the `TraitAdd` may apply for *numbers*, *bigints*, *vectors*, etc...

So, **every Trait should have a `GSelf` as first generic**, used to type the `this`.
And, because we don't known in advance the incoming and outgoing values, we will define them as generics too.

For simplicity, common Traits may be found in the `built-in/` folder.
We will use the `built-in/arithmetic/`'s ones in the following examples.

#### Extend a Trait

Usually, there is more than one way to obtain equivalent results.
For example, a subtraction, may be written as `add(num1, negate(num2))`.

This may be useful if an object implements the `TraitAdd` and `TraitNegate` but lacks of a proper implementation of the `TraitSubstract`.

So here is the definition of a Trait using this approach and extending `TraitSubstract`:

```ts
@Trait()
export abstract class TraitSubtractUsingAddAndNegate<GSelf extends TraitAdd<GSelf, any, any>, GValue extends TraitNegate<GValue, TInferTraitAddGValue<GSelf>>> extends TraitSubtract<GSelf, GValue, TInferTraitAddGReturn<GSelf>> {
  subtract(this: GSelf, value: GValue): TInferTraitAddGReturn<GSelf> {
    return this.add(value.negate());
  }
}
```

The typing may be a little freaky so let's stop on it a few minutes:

- `GSelf extends TraitAdd<GSelf, any, any>`: the incoming `this` must implement `TraitAdd`
- `GValue extends TraitNegate<GValue, TInferTraitAddGValue<GSelf>>`: the incoming `value` must implement `TraitNegate`,
and calling this method must return the proper type expected by `this.add`
- `TInferTraitAddGReturn<GSelf>`: returned type of the `TraitAdd` of `GSelf`

Yes, the typing is probable confusing and may seem complex. Here I strongly typed my Traits,
but it's up to you to type them loosely, even if I don't recommend it: it will help you to avoid errors when implementing your Traits.


#### Data structure

We've defined some very generic Traits. Now we will create a data structure able to use them.

Let's create a wrapper around a `number`:

```ts
export interface INumberStruct {
  value: number;
}
```

Note that our structure is simply an object. It may be a plain object `{ value: 1 }`, or the instance of a class `NumberLike` for example.


#### Implementation

An Implementation, is the implementation of a Trait for a specific data structure.

```ts
@Impl()
export class ImplTraitAddForNumberStruct<GSelf extends INumberStruct> extends TraitAdd<GSelf, INumberStruct, INumberStruct> {
  add(this: GSelf, value: INumberStruct): INumberStruct {
    return { value: this.value + value.value };
  }
}
```

An Implementation has the following constraints:

- **it must have the `Impl` decorator** - this is used to register this class as an Implementation.
- **it must extend a Trait** - an Implementation is always for a specific Trait.
- **it must be a non abstract class**
- **it must contain only methods**
- **it must implement all the abstract methods defined in the extended trait**
- **it must not have any constructor** - like Traits, an Implementation is not constructible

**INFO:** as you may see, our Implementation returns a `INumberStruct`, meaning we won't be able to chain the operations:
`num.add({ value: 5 }).add({ value: 6 })` => NOPE. We will solve this problem.

#### NumberLike to the rescue

Let's modify our previous implementation to return a more complex object:

```ts
@Impl()
export class ImplTraitAddForNumber<GSelf extends INumber> extends TraitAdd<GSelf, INumberStruct, INumber> {
  add(this: GSelf, value: INumberStruct): INumber {
    return new NumberLike(this.value + value.value);
  }
}
```

And the definition of `INumber`:

```ts
export interface INumber extends INumberStruct,
  ImplTraitAddForNumber<INumber>
{}
```

So `INumber` is simply a `INumberStruct` which implements `TraitAdd`

Now we need to create a class based on `INumber`: 

```ts
// defines the shape of the class using our Implementations
export interface IAssembledNumberImplementations {
  new(): INumber;
}

// list of our implementations for INumber; currenly we just have one
export const NumberImplementationsCollection = [
  ImplTraitAddForNumber,
];

// creates a class which implements all of our Implementations
const AssembledNumberImplementations = AssembleTraitImplementations<IAssembledNumberImplementations>(NumberImplementationsCollection);

// creates NumberLike: a class implementing our Implementations having the shape of INumberStruct
export class NumberLike extends AssembledNumberImplementations implements INumber {
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }
}
```

The important part is `AssembleTraitImplementations`. This function merges a list of Implementations as a class.
Then you can create any child class extending the result of the merge, and it will implement all the Traits and methods.

#### Testing NumberLike

```ts
export function testNumberLike() {
  const num1 = new NumberLike(1);
  const num2 = new NumberLike(2);
  const num3 = new NumberLike(3);

  console.log(num1.add(num2)); // NumberLike(3)
  console.log(num1.add(num2).add(num3)); // NumberLike(6)
  console.log(num1.add({ value: 20 })); // NumberLike(21)
  console.log(TraitIsImplementedBy(TraitAdd, num1)); // true
}
```

// TODO source file link
