import { IDerivableFunctionStruct, TGenericDerivableFunctionStruct } from '../definition';
import { TGenericFunction } from '../../../../../types/misc-types';


export type TDerivableFunctionEquals = <GFunction extends TGenericFunction>(
  this: IDerivableFunctionStruct<GFunction>,
  derivableFunction: TGenericDerivableFunctionStruct
) => derivableFunction is IDerivableFunctionStruct<GFunction>;

export function DerivableFunctionEquals<GFunction extends TGenericFunction>(
  this: IDerivableFunctionStruct<GFunction>,
  derivableFunction: TGenericDerivableFunctionStruct
): derivableFunction is IDerivableFunctionStruct<GFunction> {
  return derivableFunction.fnc === this.fnc;
}

