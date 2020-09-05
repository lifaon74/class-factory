import { TraitImplementFor } from '../../functions/trait-implement-for';
import { TGenericTraitStruct, TWithImplementedTrait } from '../../trait-types';
import { IMethodStruct } from '../../../method/method-struct-definition';


export type TTraitImplementForTraitName = 'implementFor';

export type TTraitImplementForTypedFunction<GThis extends TGenericTraitStruct> = <GTarget>(
  this: GThis,
  target: GTarget,
) => TWithImplementedTrait<GTarget, GThis>;


export type TTraitImplementForTypedMethodStruct<GThis extends TGenericTraitStruct> = IMethodStruct<TTraitImplementForTraitName, TTraitImplementForTypedFunction<GThis>>;

export function CreateTraitImplementForTraitStruct<GThis extends TGenericTraitStruct>(): TTraitImplementForTypedMethodStruct<GThis> {
  return {
    propertyKey: 'implementFor',
    value: TraitImplementFor,
  };
}
