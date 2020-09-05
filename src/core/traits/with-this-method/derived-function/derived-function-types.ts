import { TGenericFunction, TInferFunctionThis } from '../../../types/misc-types';

export type TDerivedFunctionConstraint<GDerivedFunction extends TGenericFunction, GFunction extends TGenericFunction> =
  [GDerivedFunction] extends [(this: infer GThis, ...args: Parameters<GFunction>) => ReturnType<GFunction>]
    ? (
      GThis extends TInferFunctionThis<GFunction>
        ? TGenericFunction
        : never
      )
    : never;
