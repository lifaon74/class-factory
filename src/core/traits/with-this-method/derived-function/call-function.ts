import { TGenericFunction, TInferFunctionThis } from '../../../types/misc-types';


export function CallFunction<GFunction extends TGenericFunction>(
  fnc: GFunction,
  thisArg: TInferFunctionThis<GFunction>,
  args: Parameters<GFunction>
): ReturnType<GFunction> {
  return fnc.apply(thisArg, args);
}
