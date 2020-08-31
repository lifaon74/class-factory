import { TGenericFunction, TInferFunctionThis } from '../../../../types/misc-types';
import {
  GetImplementForOptionsConfigurable, GetImplementForOptionsEnumerable, GetImplementForOptionsWritable,
  IImplementForOptions, ImplementFunctionFor, IsFunctionOrDerivedImplementedBy, RegisterDerivedFunction,
  TWithImplementedFunction
} from '../../functions/derived-function';
import { DerivableFunction, TDerivedFunctionConstraint } from '../derivable-function-class';
import { TTraitFunctionOptions } from './types';



export class TraitFunctionStruct<GPropertyKey extends PropertyKey, GFunction extends TGenericFunction> extends DerivableFunction<GFunction> {
  readonly propertyKey: GPropertyKey;
  readonly enumerable: boolean;
  readonly configurable: boolean;
  readonly writable: boolean;

  constructor(
    propertyKey: GPropertyKey,
    fnc: GFunction,
    options?: TTraitFunctionOptions,
  ) {
    super(fnc);
    this.propertyKey = propertyKey;
    this.enumerable = GetImplementForOptionsEnumerable(options);
    this.configurable = GetImplementForOptionsConfigurable(options);
    this.writable = GetImplementForOptionsWritable(options);
  }
}
