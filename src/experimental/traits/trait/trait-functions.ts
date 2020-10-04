import { TGenericTrait, TInferTraitPrototype } from './trait-types';
import { TGenericFunction } from '../../types/function-types';
import { ListGlobalVariablesHavingPrototype } from '../../misc/list-global-variables-having-prototype';
import { THavingPrototype } from '../../types/class-types';
import { HasProperty } from '../../object-helpers/object-has-property';
import { RegisterChildFunctionForObjectPrototypeChain } from '../../function-helpers/register-child-function-for-object-prototype-chain';


// export function RegisterChildTrait(
//   childTrait: TGenericTrait,
//   parentTrait: TGenericTrait,
// ): void {
//   const childMethods: readonly TGenericMethod[] = ExtractMethodsFromTraitCached<TGenericTrait>(childTrait);
//   const parentMethods: readonly TGenericMethod[] = ExtractMethodsFromTraitCached<TGenericTrait>(childTrait);
// }


/**
 * TODO improve
 */
export function ReflectTraitOnGlobalVariables<GTrait extends TGenericTrait, GPropertyKey extends keyof TInferTraitPrototype<GTrait>>(
  trait: GTrait,
  propertyKey: GPropertyKey,
): void {
  const traitMethod: TGenericFunction = (trait.prototype as any)[propertyKey];
  const iterator: Iterator<[PropertyKey, THavingPrototype]> = ListGlobalVariablesHavingPrototype();
  let result: IteratorResult<[PropertyKey, THavingPrototype]>;
  while (!(result = iterator.next()).done) {
    const [globalVariableName, globalVariable] = result.value;
    if (HasProperty(globalVariable.prototype, propertyKey)) {
      // console.log(globalVariableName);
      RegisterChildFunctionForObjectPrototypeChain(globalVariable.prototype, propertyKey, traitMethod);
    }
  }
}
