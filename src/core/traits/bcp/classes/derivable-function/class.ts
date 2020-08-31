import { TGenericFunction, TInferFunctionThis } from '../../../../types/misc-types';
import { IsFunctionDerivedFrom, RegisterDerivedFunction } from '../../functions/derived-function';
import { TDerivedFunctionConstraint, TGenericDerivableFunction } from '../derivable-function-class';
import { IDerivableFunctionStruct } from './definition';
import { IDerivableFunctionCallTrait } from './methods/call';
import { DerivableFunctionNew } from './methods/new';

export interface IDerivableFunction<GFunction extends TGenericFunction> extends IDerivableFunctionStruct<GFunction>, IDerivableFunctionCallTrait<GFunction> {

}

export function CallFunction<GFunction extends TGenericFunction>(
  fnc: GFunction
) {

}

/**
 * TODO continue here:
 * - create a function which implement multiple trait function in an object
 */

export class DerivableFunction<GFunction extends TGenericFunction> implements IDerivableFunction<GFunction> {
  readonly fnc: GFunction;

  constructor(
    fnc: GFunction,
  ) {
    DerivableFunctionNew.call(this, fnc);
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
