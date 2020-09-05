import { IMethodStruct } from '../../../method/method-struct-definition';
import { TConstructorOrVoid, TGenericTraitStruct, TTraitToClassConstructorWithVoidAllowed } from '../../trait-types';
import { TraitToClass } from '../../functions/trait-to-class';

export type TTraitToClassMethodName = 'toClass';

export type TTraitToClassTypedFunction<GThis extends TGenericTraitStruct> = <GBaseClass extends TConstructorOrVoid>(
  this: GThis,
  baseClass?: GBaseClass,
) => TTraitToClassConstructorWithVoidAllowed<GThis, GBaseClass>;


export type TTraitToClassTypedMethodStruct<GThis extends TGenericTraitStruct> = IMethodStruct<TTraitToClassMethodName, TTraitToClassTypedFunction<GThis>>;

export function CreateTraitToClassMethodStruct<GThis extends TGenericTraitStruct>(): TTraitToClassTypedMethodStruct<GThis> {
  return {
    propertyKey: 'toClass',
    value: TraitToClass,
  };
}
