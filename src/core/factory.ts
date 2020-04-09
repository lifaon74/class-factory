import { SetInstanceOf } from './instance-of';
import { Constructor } from './types/class-types';
import {
  IMakeFactoryOptions, TMakeFactoryClass, TMakeFactoryCreateSuperClass, TMakeFactoryFactories
} from './types/factory-types';


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
    value: null,
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
        value: null,
      });
    }
  }

  if (options.instanceOf !== void 0) {
    SetInstanceOf(options.instanceOf, _class);
  }

  return _class;
}


/**
 * Returns true if class has the specified watermark
 */
export function HasFactoryWaterMark(_class: (new(...args: any[]) => any), waterMark: symbol, direct: boolean = true): boolean {
  return direct
    ? _class.hasOwnProperty(waterMark)
    : (waterMark in _class);
}


const IS_FACTORY_CLASS = Symbol('is-factory-class');

/**
 * Returns true if class has been build with MakeFactory
 */
export function IsFactoryClass(_class: (new(...args: any[]) => any), direct: boolean = true): boolean {
  // return (IS_FACTORY_CLASS in _class);
  return direct
    ? _class.hasOwnProperty(IS_FACTORY_CLASS)
    : (IS_FACTORY_CLASS in _class);
}



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
 * @param args
 * @param superArgs
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


