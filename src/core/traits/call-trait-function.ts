import { TGenericFunction, TInferFunctionThis } from '../types/misc-types';
import { TInferTraitFunctionFunction, TraitFunction } from './trait-function-class';
import { Trait } from './trait-class';

/**
 * Calls 'traitFunction' on 'target'
 *  - if target implements this 'traitFunction' or a derived one, calls directly its method
 *  - else, calls 'traitFunction'
 * INFO: this is used to call the real implementation of 'traitFunction' on 'target', and fallback to 'traitFunction' if not implemented
 */
export function CallTraitFunctionAsMethod<GTraitFunction extends TraitFunction<PropertyKey, TGenericFunction>>(
  traitFunction: GTraitFunction,
  target: TInferFunctionThis<TInferTraitFunctionFunction<any>>,
  args: Parameters<TInferTraitFunctionFunction<any>>,
): ReturnType<TInferTraitFunctionFunction<any>> {
  if (traitFunction.isImplementedBy<TInferFunctionThis<TInferTraitFunctionFunction<any>>>(target)) {
    return (target as any)[traitFunction.propertyKey](...args);
  } else {
    return traitFunction.fnc.apply(target, args);
  }
}

export function CallTraitFunctionOrFallback<GTraitFunction extends TraitFunction<PropertyKey, TGenericFunction>>(
  traitFunction: GTraitFunction,
  target: TInferFunctionThis<TInferTraitFunctionFunction<any>>,
  args: Parameters<TInferTraitFunctionFunction<any>>,
  fallback: TInferTraitFunctionFunction<any>,
): ReturnType<TInferTraitFunctionFunction<any>> {
  if (traitFunction.isImplementedBy<TInferFunctionThis<TInferTraitFunctionFunction<any>>>(target)) {
    return (target as any)[traitFunction.propertyKey](...args);
  } else {
    return fallback.apply(target, args);
  }
}


export function CallTraitMethodOrFallback<
  GTarget,
  GMethodName extends PropertyKey,
  GArgs extends any[],
  GReturn,
  GTrait extends Trait<TraitFunction<GMethodName, (instance: GTarget, ...args: GArgs) => GReturn>>
  >(
  trait: GTrait,
  target: GTarget,
  methodName: GMethodName,
  args: GArgs,
  fallback: (instance: GTarget, ...args: GArgs) => GReturn,
): GReturn {
  const traitFunction = trait.get(methodName);
  if (traitFunction === void 0) {
    return fallback(target, ...args);
  } else {
    return CallTraitFunctionOrFallback(traitFunction, target, args, fallback);
  }
}
