
## Naming convention

### Types

##### types / interfaces

prefixed by `T`

```ts
type TArray = [];

interface TObject {
  prop: any;
}
```

##### inferred types

prefixed by `TInfer`

```ts
type TInferFunctionParameters<GFunction extends (...args: any[]) => any> = 
  GFunction extends (...args: infer GArguments) => any
    ? GArguments
    : never;
```

##### generic types

prefixed by `G`

```ts
type TArray<GValue> = GValue[];
```

##### constructor type

pattern: `T[Name]Constructor`
typed pattern: `T[Name]TypedConstructor`
static pattern: `T[Name]Static`

```ts
export interface TArrayStatic {
  create<GValue>(size: number): TArray<GValue>;
}

export interface TArrayConstructor extends TArrayStatic {
  new<GValue>(items: Iterable<GValue>): TArray<GValue>;
}

export interface TArrayTypedConstructor<GValue> extends TArrayStatic {
  new(items: Iterable<GValue>): TArray<GValue>;
}

export interface TArray<GValue> {
  item(index: number): GValue;
}
```

---

### Classes

- `interfaces.ts`: the definition of the class + constructor
- `types.ts`: types used by the class
- `implementation.ts`: the class, its internal methods, optional factory
- `privates.ts`: types and symbol for internal properties of the class 

```ts
export const OBSERVER_PRIVATE = Symbol('observer-private');

export interface IObserverPrivate<T> {
  activated: boolean;
  observables: IObservable<T>[];
  readOnlyObservables: IReadonlyList<IObservable<T>>;

  onEmit(value: T, observable?: IObservable<T>): void;
}

export interface IObserverPrivatesInternal<T> {
  [OBSERVER_PRIVATE]: IObserverPrivate<T>;
}

export interface IObserverInternal<T> extends IObserverPrivatesInternal<T>, TObserver<T> {
}
```



##### method name (as function)

```ts
/** METHODS **/
```

```ts
/* GETTERS/SETTERS */
```

`function [Class name]Get[Property name](instance: T[Class name]): any`

```ts
/* METHODS */
```

`function [Class name][Method name](instance: T[Class name]): any`


```ts
/* STATIC METHODS */
```

`function [Class name]Static[Method name](instance: T[Class name]): any`


