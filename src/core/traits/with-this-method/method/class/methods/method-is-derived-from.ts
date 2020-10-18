import { MethodIsDerivedFrom } from '../../functions/method-is-derived-from';
import { IMethodStruct } from '../../method-struct-definition';
import { TGenericMethodStruct } from '../../method-types';


export type TMethodIsDerivedFromMethodName = 'isDerivedFrom';

export type TMethodIsDerivedFromTypedFunction<GThis extends TGenericMethodStruct> = (
  this: GThis,
  target: TGenericMethodStruct,
) => boolean;


export type TMethodIsDerivedFromTypedMethodStruct<GThis extends TGenericMethodStruct> = IMethodStruct<TMethodIsDerivedFromMethodName, TMethodIsDerivedFromTypedFunction<GThis>>;

export function CreateMethodIsDerivedFromMethodStruct<GThis extends TGenericMethodStruct>(): TMethodIsDerivedFromTypedMethodStruct<GThis> {
  return {
    propertyKey: 'isDerivedFrom',
    value: MethodIsDerivedFrom,
  };
}
