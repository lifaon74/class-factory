import { TGenericFunction, TInferFunctionThis } from '../types/misc-types';
import { IsFunctionDerivedFrom, RegisterDerivedFunction } from './pure-derivable-function';

/**
 * Simple wrapper around a pure derivable function
 */

export type TGenericDerivableFunction = DerivableFunction<TGenericFunction>;

export type TInferDerivableFunctionFunction<GDerivableFunction extends TGenericDerivableFunction> =
  GDerivableFunction extends DerivableFunction<infer GFunction>
    ? GFunction
    : never;

export type TDerivedFunctionConstraint<GDerivedFunction extends TGenericFunction, GFunction extends TGenericFunction> =
  [GDerivedFunction] extends [(this: infer GThis, ...args: Parameters<GFunction>) => ReturnType<GFunction>]
    ? (
      GThis extends TInferFunctionThis<GFunction>
        ? TGenericFunction
        : never
      )
    : never;

export class DerivableFunction<GFunction extends TGenericFunction> {
  readonly fnc: GFunction;

  constructor(
    fnc: GFunction,
  ) {
    this.fnc = fnc;
  }

  derive<GDerivedFunction extends TDerivedFunctionConstraint<GDerivedFunction, GFunction>>(
    fnc: GDerivedFunction,
  ): DerivableFunction<GDerivedFunction> {
    RegisterDerivedFunction(this.fnc, fnc);
    return new DerivableFunction<GDerivedFunction>(fnc);
  }

  call(instance: TInferFunctionThis<GFunction>, ...args: Parameters<GFunction>): ReturnType<GFunction> {
    return this.fnc.call(instance, ...args);
  }

  isDerivedFrom(derivableFunction: TGenericDerivableFunction): boolean {
    return IsFunctionDerivedFrom(this.fnc, derivableFunction.fnc);
  }

  equals(derivableFunction: TGenericDerivableFunction): derivableFunction is DerivableFunction<GFunction> {
    return derivableFunction.fnc === this.fnc;
  }
}
