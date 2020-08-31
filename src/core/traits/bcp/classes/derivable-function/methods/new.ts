import { TGenericFunction } from '../../../../../types/misc-types';
import { IDerivableFunctionStruct } from '../definition';

export type TDerivableFunctionNew = <GFunction extends TGenericFunction>(
  this: IDerivableFunctionStruct<GFunction>,
  fnc: GFunction,
) => IDerivableFunctionStruct<GFunction>;

export function DerivableFunctionNew<GFunction extends TGenericFunction>(
  this: IDerivableFunctionStruct<GFunction>,
  fnc: GFunction,
): IDerivableFunctionStruct<GFunction> {
  this.fnc = fnc;
  return this;
}
