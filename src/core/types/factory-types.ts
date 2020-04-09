import { ClassType, Constructor } from './class-types';
import { TupleConcat, TupleToIntersection } from './misc-types';

/**
 * A class Factory is simply a function which accepts a baseClass and return a new class extending this baseClass
 */
export type TFactory = <TBase extends Constructor>(superClass: TBase) => TBase;

// exclude the constructor from T
export type ExcludeConstructor<T> = {
  [P in keyof T]: T[P] extends new(...args: any[]) => any ? never : T[P];
};

// removes all constructors of a tuple
export type ExcludeConstructors<T extends any[]> = {
  // [P in Extract<keyof T, number>]: ExcludeConstructor<T[P]>;
  [P in keyof T]: ExcludeConstructor<T[P]>;
};


// converts a tuple of constructor types (ex: [Constructor<A>, Constructor<B>]) to a tuple of instances types
export type InstancesTypes<T extends (new (...args: any[]) => any)[]> = {
  [P in keyof T]: T[P] extends new (...args: any[]) => infer R ? R : never;
  // [P in Extract<keyof T, number>]: T[P] extends new (...args: any[]) => infer R ? R : never;
};

// converts a tuple of constructor types (ex: [Constructor<A>, Constructor<B>]) to a tuple of their parameters
export type ConstructorsParameters<T extends (new (...args: any[]) => any)[]> = {
  [P in keyof T]: T[P] extends new (...args: infer P) => any ? P : never;
};


// returns a tuple where types are the expected factories types
export type TMakeFactoryFactories<TSuperClasses extends (new (...args: any[]) => any)[]> = {
  [P in keyof TSuperClasses]: TSuperClasses[P] extends (new (...args: any[]) => infer R)
    ? (superClass: any) => new(ownArgs: any[], ...args: any[]) => R
    : never;
};


export type TMakeFactorySuperInstance<TSuperClasses extends Constructor[]> = TupleToIntersection<InstancesTypes<TSuperClasses>>;

export type TMakeFactoryInstance<TChildClass extends Constructor, TSuperClasses extends Constructor[], TBase extends Constructor> =
  InstanceType<TBase>
  & TMakeFactorySuperInstance<TSuperClasses>
  & InstanceType<TChildClass>;

export type TMakeFactorySuperStatic<TSuperClasses extends Constructor[]> = TupleToIntersection<ExcludeConstructors<TSuperClasses>>;

export type TMakeFactoryStatic<TChildClass extends Constructor, TSuperClasses extends Constructor[], TBase extends Constructor> =
  ExcludeConstructor<TBase>
  & TMakeFactorySuperStatic<TSuperClasses>
  & ExcludeConstructor<TChildClass>;

export type TMakeFactoryCreateSuperClass<TSuperClasses extends Constructor[]> =
  TSuperClasses extends []
    ? new(...args: any) => any
    : TMakeFactorySuperStatic<TSuperClasses> & {
    new(...args: any): TMakeFactorySuperInstance<TSuperClasses>;
  };

export type TMakeFactoryClass<TChildClass extends Constructor, TSuperClasses extends Constructor[], TBase extends Constructor> =
  TMakeFactoryStatic<TBase, TSuperClasses, TChildClass>
  & {
  new(ownArgs: ConstructorParameters<TChildClass>, ...args: TupleConcat<ConstructorsParameters<TSuperClasses>, ConstructorParameters<TBase>>): TMakeFactoryInstance<TChildClass, TSuperClasses, TBase>;
};


export interface IMakeFactoryOptions {
  name?: string; // force a name for this class
  instanceOf?: ClassType; // force instanceof for this class
  waterMarks?: symbol[]; // uniq symbol to identify the class type
}
