import { TGenericTrait, TInferTraitPropertyKeys, TInferTraitPrototype } from './trait-types';
import { CallFunction } from '../../function-helpers/call-function';
import { TGenericFunction } from '../../types/function-types';
import { IsChildFunctionOf } from '../../function-helpers/register-child-function';


/** TYPES **/

export type TInferTraitMethodThisArgument<GTrait extends TGenericTrait, GPropertyKey extends TInferTraitPropertyKeys<GTrait>, GDefault = never> =
  TInferTraitPrototype<GTrait>[GPropertyKey] extends (this: infer GThis) => any ? GThis : GDefault;

export type TInferTraitMethodArguments<GTrait extends TGenericTrait, GPropertyKey extends TInferTraitPropertyKeys<GTrait>> =
  TInferTraitPrototype<GTrait>[GPropertyKey] extends (...args: infer GArgs) => any ? GArgs : never;

export type TInferTraitMethodReturn<GTrait extends TGenericTrait, GPropertyKey extends TInferTraitPropertyKeys<GTrait>> =
  TInferTraitPrototype<GTrait>[GPropertyKey] extends (...args: any[]) => infer GReturn ? GReturn : never;

export type TInferTraitMethod<GTrait extends TGenericTrait, GPropertyKey extends TInferTraitPropertyKeys<GTrait>> =
  Extract<TInferTraitPrototype<GTrait>[GPropertyKey], TGenericFunction>;


/*---*/

/**
 * Calls the method of a Trait selected by it's name
 */
export function CallTraitMethod<GTrait extends TGenericTrait, GPropertyKey extends TInferTraitPropertyKeys<GTrait>>(
  trait: GTrait,
  propertyKey: GPropertyKey,
  thisArgs: TInferTraitMethodThisArgument<GTrait, GPropertyKey, unknown>,
  args: TInferTraitMethodArguments<GTrait, GPropertyKey>,
): TInferTraitMethodReturn<GTrait, GPropertyKey> {
  // return trait.prototype[propertyKey].apply(thisArgs, args);
  return CallFunction(GetTraitMethod<GTrait, GPropertyKey>(trait, propertyKey) as unknown as TGenericFunction, thisArgs, args);
}


/**
 * Calls the method of a Trait selected by it's name, BUT, if the method is already implemented on 'this', calls the 'this' method instead
 */
export function CallTraitMethodOnObjectUsingFunction<GTrait extends TGenericTrait, GPropertyKey extends keyof TInferTraitPrototype<GTrait>>(
  traitMethod: TInferTraitMethod<GTrait, GPropertyKey>,
  propertyKey: GPropertyKey,
  thisArgs: TInferTraitMethodThisArgument<GTrait, GPropertyKey, unknown>,
  args: TInferTraitMethodArguments<GTrait, GPropertyKey>,
): TInferTraitMethodReturn<GTrait, GPropertyKey> {
  const objectMethod: any = (thisArgs as any)[propertyKey];

  return CallFunction(
    ((typeof objectMethod === 'function') && IsChildFunctionOf(objectMethod, traitMethod))
      ? objectMethod
      : traitMethod,
    thisArgs,
    args,
  );
}

/**
 * Like CallTraitMethodOnObjectUsingFunction, but provide a Trait instead
 */
export function CallTraitMethodOnObject<GTrait extends TGenericTrait, GPropertyKey extends keyof TInferTraitPrototype<GTrait>>(
  trait: GTrait,
  propertyKey: GPropertyKey,
  thisArgs: TInferTraitMethodThisArgument<GTrait, GPropertyKey, unknown>,
  args: TInferTraitMethodArguments<GTrait, GPropertyKey>,
): TInferTraitMethodReturn<GTrait, GPropertyKey> {
  return CallTraitMethodOnObjectUsingFunction<GTrait, GPropertyKey>(
    GetTraitMethod<GTrait, GPropertyKey>(trait, propertyKey),
    propertyKey,
    thisArgs,
    args
  );
}


/**
 * Returns the method (as function) of a Trait selected by it's name
 */
export function GetTraitMethod<GTrait extends TGenericTrait, GPropertyKey extends TInferTraitPropertyKeys<GTrait>>(
  trait: GTrait,
  propertyKey: GPropertyKey,
): TInferTraitMethod<GTrait, GPropertyKey> {
  return (trait.prototype as any)[propertyKey];
}
