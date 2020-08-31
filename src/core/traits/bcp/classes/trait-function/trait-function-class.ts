import { TGenericFunction, TInferFunctionThis } from '../../../../types/misc-types';
import {
  GetImplementForOptionsConfigurable, GetImplementForOptionsEnumerable, GetImplementForOptionsWritable,
  IImplementForOptions, ImplementFunctionFor, IsFunctionOrDerivedImplementedBy, RegisterDerivedFunction,
  TWithImplementedFunction
} from '../../functions/derived-function';
import { DerivableFunction, TDerivedFunctionConstraint } from '../derivable-function-class';


/**
 * Represents a derivable function associated with a property
 */

export interface TTraitFunctionOptions extends IImplementForOptions {
}

export type TGenericTraitFunction = TraitFunction<PropertyKey, TGenericFunction>;

export type TInferTraitFunctionFunction<GTraitFunction extends TGenericTraitFunction> =
  GTraitFunction extends TraitFunction<PropertyKey, infer GFunction>
    ? GFunction
    : never;

export class TraitFunction<GPropertyKey extends PropertyKey, GFunction extends TGenericFunction> extends DerivableFunction<GFunction> {
  readonly propertyKey: GPropertyKey;
  readonly enumerable: boolean;
  readonly configurable: boolean;
  readonly writable: boolean;

  constructor(
    propertyKey: GPropertyKey,
    fnc: GFunction,
    options?: TTraitFunctionOptions,
  ) {
    super(fnc);
    this.propertyKey = propertyKey;
    this.enumerable = GetImplementForOptionsEnumerable(options);
    this.configurable = GetImplementForOptionsConfigurable(options);
    this.writable = GetImplementForOptionsWritable(options);
  }


  /**
   * Creates a new TraitFunction derived from this one:
   *  - 'derivedFunction' is marked as derived from this.fnc
   */
  derive<GDerivedFunction extends TDerivedFunctionConstraint<GDerivedFunction, GFunction>>(
    derivedFunction: GDerivedFunction,
    options?: TTraitFunctionOptions,
  ): TraitFunction<GPropertyKey, GDerivedFunction> {
    RegisterDerivedFunction(this.fnc, derivedFunction);
    return new TraitFunction<GPropertyKey, GDerivedFunction>(
      this.propertyKey,
      derivedFunction,
      {
        enumerable: this.enumerable,
        configurable: this.configurable,
        writable: this.writable,
        ...options,
      },
    );
  }

  derivedFrom<GParentFunction extends GFunction>(
    parentFunction: GParentFunction,
    options?: TTraitFunctionOptions,
  ): TraitFunction<GPropertyKey, GParentFunction> {
    RegisterDerivedFunction(parentFunction, this.fnc);
    return new TraitFunction<GPropertyKey, GParentFunction>(
      this.propertyKey,
      parentFunction,
      {
        enumerable: this.enumerable,
        configurable: this.configurable,
        writable: this.writable,
        ...options,
      },
    );
  }

  /**
   * Implements this TraitFunction on 'target'
   */
  implementFor<GTarget extends TInferFunctionThis<GFunction>>(
    target: GTarget,
    options?: IImplementForOptions
  ): TWithImplementedFunction<GTarget, GPropertyKey, GFunction> {
    return ImplementFunctionFor<GTarget, GPropertyKey, GFunction>(
      target,
      this.propertyKey,
      this.fnc,
      {
        enumerable: this.enumerable,
        configurable: this.configurable,
        writable: this.writable,
        ...options,
      }
    );
  }

  /**
   * Returns true if this TraitFunction or any of it's derived functions is implemented by 'target'
   */
  isImplementedBy<GTarget>(
    target: GTarget,
  ): target is TWithImplementedFunction<GTarget, GPropertyKey, GFunction> {
    return IsFunctionOrDerivedImplementedBy<GTarget, GPropertyKey, GFunction>(target, this.propertyKey, this.fnc);
  }

  /**
   * Compares this TraitFunction with 'traitFunction' and returns true if similar
   */
  equals(traitFunction: TGenericTraitFunction): traitFunction is TraitFunction<GPropertyKey, GFunction> {
    return super.equals(traitFunction)
      && (traitFunction.propertyKey === this.propertyKey)
      // && (traitFunction.enumerable === this.enumerable)
      // && (traitFunction.configurable === this.configurable)
      // && (traitFunction.writable === this.writable)
      ;
  }

}
