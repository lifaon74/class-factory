import { IImplementForOptions } from '../../functions/derived-function';
import { TGenericFunction } from '../../../../types/misc-types';


/**
 * Represents a derivable function associated with a property
 */

export interface ITraitFunctionStruct<GPropertyKey extends PropertyKey> {
  readonly propertyKey: GPropertyKey;
  readonly enumerable: boolean;
  readonly configurable: boolean;
  readonly writable: boolean;
}





export interface TTraitFunctionOptions extends IImplementForOptions {
}

export type TGenericTraitFunction = TraitFunction<PropertyKey, TGenericFunction>;

export type TInferTraitFunctionFunction<GTraitFunction extends TGenericTraitFunction> =
  GTraitFunction extends TraitFunction<PropertyKey, infer GFunction>
    ? GFunction
    : never;
