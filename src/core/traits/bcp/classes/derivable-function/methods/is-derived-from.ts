import { IDerivableFunctionStruct } from '../definition';
import { TGenericFunction, TInferFunctionThis } from '../../../../../types/misc-types';
import { IsFunctionDerivedFrom } from '../../../functions/derived-function';
import { TGenericDerivableFunction } from '../../derivable-function-class';

export type TDerivableFunctionIsDerivedFrom = <GFunction extends TGenericFunction>(
  this: IDerivableFunctionStruct<GFunction>,
  derivableFunction: TGenericDerivableFunction
) => boolean;

export function DerivableFunctionIsDerivedFrom<GFunction extends TGenericFunction>(
  this: IDerivableFunctionStruct<GFunction>,
  derivableFunction: TGenericDerivableFunction
): boolean {
  return IsFunctionDerivedFrom(this.fnc, derivableFunction.fnc);
}
