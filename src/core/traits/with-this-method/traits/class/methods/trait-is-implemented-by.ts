import { TraitIsImplementedBy } from '../../functions/trait-is-implemented-by';
import { TGenericTraitStruct, TWithImplementedTrait } from '../../trait-types';
import { IMethodStruct } from '../../../method/method-struct-definition';


export type TTraitIsImplementedByTraitName = 'isImplementedBy';

export type TTraitIsImplementedByTypedFunction<GThis extends TGenericTraitStruct> = <GTarget>(
  this: GThis,
  target: GTarget,
) => target is TWithImplementedTrait<GTarget, GThis>;


export type TTraitIsImplementedByTypedMethodStruct<GThis extends TGenericTraitStruct> = IMethodStruct<TTraitIsImplementedByTraitName, TTraitIsImplementedByTypedFunction<GThis>>;

export function CreateTraitIsImplementedByTraitStruct<GThis extends TGenericTraitStruct>(): TTraitIsImplementedByTypedMethodStruct<GThis> {
  return {
    propertyKey: 'isImplementedBy',
    value: TraitIsImplementedBy,
  };
}
