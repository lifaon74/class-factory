import { TGenericFunction } from '../../../../types/misc-types';

/**
 * Simple wrapper around a pure derivable function
 */
export interface IDerivableFunctionStruct<GFunction extends TGenericFunction> {
  fnc: GFunction;
}

export type TGenericDerivableFunctionStruct = IDerivableFunctionStruct<TGenericFunction>;
