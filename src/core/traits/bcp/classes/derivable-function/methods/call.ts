import { IDerivableFunctionStruct } from '../definition';
import { TGenericFunction, TInferFunctionThis } from '../../../../../types/misc-types';


export type TDerivableFunctionCall = <GFunction extends TGenericFunction>(
  this: IDerivableFunctionStruct<GFunction>,
  instance: TInferFunctionThis<GFunction>,
  ...args: Parameters<GFunction>
) => ReturnType<GFunction>;

export function DerivableFunctionCall<GFunction extends TGenericFunction>(
  this: IDerivableFunctionStruct<GFunction>,
  instance: TInferFunctionThis<GFunction>,
  ...args: Parameters<GFunction>
): ReturnType<GFunction> {
  return this.fnc.call(instance, ...args);
}


export interface IDerivableFunctionCallTrait<GFunction extends TGenericFunction> {
  call(
    this: IDerivableFunctionStruct<GFunction>,
    instance: TInferFunctionThis<GFunction>,
    ...args: Parameters<GFunction>
  ): ReturnType<GFunction>;
}
