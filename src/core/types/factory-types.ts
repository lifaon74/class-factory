import {
  ClassType,
  Constructor, ConstructorsParameters, ExcludeConstructor, ExcludeConstructors, InstancesTypes
} from './class-types';
import { TupleConcat, TupleToIntersection } from './misc-types';

// returns a tuple where types are the expected factories types
export type TMakeFactoryFactories<TSuperClasses extends (new (...args: any[]) => any)[]> = {
  [P in keyof TSuperClasses]: TSuperClasses[P] extends (new (...args: any[]) => infer R)
    ? (superClass: any) => new(/*ownArgs: any[], */...args: any[]) => R
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
