import { IDerivableFunctionStruct } from '../definition';
import { TGenericFunction } from '../../../../../types/misc-types';
import { RegisterDerivedFunction } from '../../../functions/derived-function';
import { TDerivedFunctionConstraint } from '../../derivable-function-class';
import { DerivableFunctionNew, TDerivableFunctionNew } from './new';

export type TDerivableFunctionDerive = <GFunction extends TGenericFunction, GDerivedFunction extends TDerivedFunctionConstraint<GDerivedFunction, GFunction>>(
  this: IDerivableFunctionStruct<GFunction>,
  fnc: GDerivedFunction,
) => IDerivableFunctionStruct<GDerivedFunction>;

export function DerivableFunctionDerive<GFunction extends TGenericFunction, GDerivedFunction extends TDerivedFunctionConstraint<GDerivedFunction, GFunction>>(
  this: IDerivableFunctionStruct<GFunction>,
  fnc: GDerivedFunction,
  create: TDerivableFunctionNew = DerivableFunctionNew
): IDerivableFunctionStruct<GDerivedFunction> {
  RegisterDerivedFunction(this.fnc, fnc);
  return create.call({}, fnc);
}
