import { AbstractClass, Constructor } from './types/class-types';
import {
  IMakeFactoryOptions, TMakeFactoryClass, TMakeFactoryCreateSuperClass, TMakeFactoryFactories
} from './types/factory-types';
import { SetInstanceOf } from './instance-of';
import { BaseClass } from './base-class';
import {
  BindDescriptorOld, CopyClass, EXCLUDED_PROPERTY_NAMES, GetOwnPropertyKeys, GetPropertyDescriptors, SetClassName
} from './helpers';

/***** MAKE *****/


/**
 * Creates a new class from :
 *  - a base class
 *  - some other factories
 *  - a child class
 *  => child extends factories extends base
 */
export function MakeFactory<TChildClass extends Constructor, TSuperClasses extends Constructor[], TBase extends Constructor>(
  create: (superClass: TMakeFactoryCreateSuperClass<TSuperClasses>) => TMakeFactoryCreateSuperClass<TSuperClasses>,
  factories: TMakeFactoryFactories<TSuperClasses>,
  superClass: TBase,
  options: IMakeFactoryOptions = {}
): TMakeFactoryClass<TChildClass, TSuperClasses, TBase> {
  let _superClass: any = superClass;
  for (let i = factories.length - 1; i >= 0; i--) {
    _superClass = factories[i](_superClass);
  }

  const _class: TMakeFactoryClass<TChildClass, TSuperClasses, TBase> = create(_superClass) as unknown as TMakeFactoryClass<TChildClass, TSuperClasses, TBase>;

  Object.defineProperty(_class, IS_FACTORY_CLASS, {
    value: true,
  });

  if (typeof options.name === 'string') {
    Object.defineProperty(_class, 'name', {
      configurable: true,
      enumerable: false,
      value: options.name,
      writable: false,
    });
  }

  if (Array.isArray(options.waterMarks)) {
    for (let i = 0, l = options.waterMarks.length; i < l; i++) {
      Object.defineProperty(_class, options.waterMarks[i], {
        value: true,
      });
    }
  }

  if (options.instanceOf !== void 0) {
    SetInstanceOf(options.instanceOf, _class);
  }

  return _class;
}


/***** MAKE FROM EXISTING CLASS *****/

/**
 * Tries to convert (does the best) a class to a class factory.
 */
export function ClassToFactory<TSource extends Constructor>(source: TSource) {
  return function<TBase extends Constructor>(superClass: TBase, mode: 'function' | 'class' | 'auto' = 'auto'): TMakeFactoryClass<TSource, [], TBase> {
    let _class;
    if (
      (superClass === (Object as any))
      || (superClass === (BaseClass as any))
    ) {
      _class = class extends (source as any) {
        constructor(args: any[]) {
          super(...args);
        }
      };
      SetInstanceOf(superClass, _class);
    } else {
      _class = class extends superClass {
        constructor(...args: any[]) {
          const ownArgs: ConstructorParameters<TSource> = args[0];
          super(...args.slice(1));

          let _this: any;
          switch (mode) {
            case 'auto':
              try {
                // try to construct the class through a function call
                _this = source.apply(this, ownArgs);
                if (_this === void 0) {
                  _this = this;
                }
                mode = 'function';
              } catch (e) {
                // construct the class though Reflect
                _this = Reflect.construct(source, ownArgs);
                mode = 'class';
              }
              break;
            case 'function':
              _this = source.apply(this, ownArgs);
              if (_this === void 0) {
                _this = this;
              }
              break;
            case 'class':
              _this = Reflect.construct(source, ownArgs);
              break;
          }


          if (this !== _this) { // a super class may return a different this
            // 1) reflect _this.constructor.prototype to this
            const iterator: IterableIterator<[PropertyKey, PropertyDescriptor, Object]> = GetPropertyDescriptors(Object.getPrototypeOf(_this));
            let result: IteratorResult<[PropertyKey, PropertyDescriptor, Object]>;
            while (!(result = iterator.next()).done) {
              const key: PropertyKey = result.value[0];
              if (!EXCLUDED_PROPERTY_NAMES.has(key)) {
                Object.defineProperty(this, key, BindDescriptorOld(_this, key, result.value[1]));
              }
            }

            // 2) reflect all own properties of _this to this
            const keys: PropertyKey[] = GetOwnPropertyKeys(_this);
            for (const key of keys) {
              if (!EXCLUDED_PROPERTY_NAMES.has(key)) {
                if (key in this) {
                  console.warn(`Crossing properties !`);
                }
                Object.defineProperty(this, key, BindDescriptorOld(_this, key, Object.getOwnPropertyDescriptor(_this, key) as PropertyDescriptor));
              }
            }

            // prevents new properties to be added on _this
            Object.seal(_this);
          }
        }
      };

      CopyClass(source, _class);
    }

    SetClassName(_class, source.name);

    return _class as any;
  };
}


/***** WATERMARK *****/

/**
 * Returns true if '_class' has the specified watermark
 */
export function HasFactoryWaterMark(_class: AbstractClass, waterMark: symbol, direct: boolean = true): boolean {
  return (_class[waterMark] === true) && (direct ? _class.hasOwnProperty(waterMark) : true);
}


const IS_FACTORY_CLASS = Symbol('is-factory-class');


/**
 * Returns true if '_class' has been build with MakeFactory
 */
export function IsFactoryClass(_class: AbstractClass, direct: boolean = true): boolean {
  return (_class[IS_FACTORY_CLASS] === true) && (direct ? _class.hasOwnProperty(IS_FACTORY_CLASS) : true);
}


/***** SUPER ARGUMENTS *****/

export interface ISearchClassResult {
  index: number;
  ctor: Constructor;
}

/**
 * Searches a super class, using a filter function
 */
export function SearchSuperClass<TClass extends Constructor>(
  _class: Constructor | null,
  filter: (_class: Constructor) => boolean
): ISearchClassResult | null {
  let index: number = 0;
  while (_class !== null) {
    if (filter(_class)) {
      return {
        index,
        ctor: _class as TClass
      };
    } else {
      index++;
      _class = Object.getPrototypeOf(_class);
    }
  }
  return null;
}

/**
 * Extracts own factory arguments
 */
export function OwnArguments<TArguments extends any[]>(args: any[]): TArguments {
  return args[0];
}

/**
 * Extracts super classes factory arguments
 */
export function SuperArguments(args: any[]): any[] {
  return args.slice(1);
}

export type TOverrideArgumentsFunction<TArguments extends any[]> = (oldArguments: TArguments) => TArguments;
export type TOverrideSuperArgumentsFunction<TArguments extends any[]> = (args: any[], getNewArguments: TOverrideArgumentsFunction<TArguments>) => any[];

/**
 * Builds a function used to override some factory arguments
 */
export function GenerateOverrideSuperArgumentsFunction<TArguments extends any[]>(
  _class: Constructor,
  filter: (_class: Constructor) => boolean,
): TOverrideSuperArgumentsFunction<TArguments> {
  const result: ISearchClassResult | null = SearchSuperClass(_class, filter);
  if (result === null) {
    throw new Error(`Failed to find super class of the class ${ _class.name }`);
  } else {
    const index: number = result.index;
    if (IsFactoryClass(result.ctor)) {
      return (args: any[], getNewArguments: (oldArguments: TArguments) => TArguments) => {
        if (Array.isArray(args[index])) {
          return args
            .slice(0, index)
            .concat([getNewArguments(args[index])])
            .concat(args.slice(index + 1));
        } else {
          throw new TypeError(`Expected array as argument[${ index }]`);
        }
      };
    } else {
      return (args: any[], getNewArguments: (oldArguments: TArguments) => TArguments) => {
        return args
          .slice(0, index)
          .concat(getNewArguments(args.slice(index) as TArguments));
      };
    }
  }
}

export type TMixedOverrideSuperArgumentsFunction<TOverrideArgumentsFunctions extends TOverrideArgumentsFunction<any[]>[]> = (args: any[], ...getNewArgumentsFunctions: TOverrideArgumentsFunctions) => any[];

export type TOverrideSuperArgumentsFunctionTupleToArgumentsTuple<TFunctions extends TOverrideSuperArgumentsFunction<any[]>[]> = {
  [TKey in keyof TFunctions]: TFunctions[TKey] extends (args: any[], getNewArguments: infer TOverrideArgumentsFunction) => any[]
    ? TOverrideArgumentsFunction
    : never
};

export function MixOverrideSuperArgumentsFunction<TFunctions extends TOverrideSuperArgumentsFunction<any[]>[]>(
  ...functions: TFunctions
): TMixedOverrideSuperArgumentsFunction<TOverrideSuperArgumentsFunctionTupleToArgumentsTuple<TFunctions>> {
  return (args: any[], ...getNewArgumentsFunctions: TOverrideSuperArgumentsFunctionTupleToArgumentsTuple<TFunctions>) => {
    for (let i = 0, l = functions.length; i < l; i++) {
      args = functions[i](args, getNewArgumentsFunctions[i]);
    }
    return args;
  };
}




/* LEGACY */

/**
 * Replace incoming args for the super class by superArgs in the context of a Factory class
 * @param args - list of remaining args from the constructor that should be passed to 'super'
 * @param superArgs - list of overloaded args to pass to the child
 */
export function SetSuperArgsForFactoryClass(args: any[], superArgs: any[]): any[] {
  if (Array.isArray(args[0])) {
    args[0] = superArgs;
    return args;
  } else {
    throw new TypeError(`Expected array as argument 0`);
  }
}

/**
 * Same as previous but class is a standard class instead
 */
export function SetSuperArgsForStandardClass(args: any[], superArgs: any[]): any[] {
  for (let i = 0, l = superArgs.length; i < l; i++) {
    args[i] = superArgs[i];
  }
  return args;
}

export type TSetSuperArgs = (args: any[], superArgs: any[]) => any[];

export function GetSetSuperArgsFunction(isFactoryClass: boolean): TSetSuperArgs {
  return isFactoryClass
    ? SetSuperArgsForFactoryClass
    : SetSuperArgsForStandardClass;
}

