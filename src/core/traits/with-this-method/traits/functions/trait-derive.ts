import { TGenericTraitStruct } from '../trait-types';
import { TGenericMethodStruct } from '../../method/method-types';
import { ITraitStruct } from '../trait-struct-definition';
import { CallFunction } from '../../derived-function/call-function';
import { ToArray } from '../../../../misc';
import { MethodIsDerivedFrom } from '../../method/functions/method-is-derived-from';

export type TDerivedTraitMethods<GTrait extends TGenericTraitStruct, GDerivedMethods extends TGenericMethodStruct> = any; // TODO

/**
 * Creates a new TraitStruct extended with new 'methods'.
 *  - 'methods' is allowed to contain derived methods present in the current TraitStruct
 */
export function TraitDerive<GThis extends TGenericTraitStruct, GDerivedMethods extends TGenericMethodStruct>(
  this: GThis,
  methods: Iterable<GDerivedMethods>,
): ITraitStruct<TDerivedTraitMethods<GThis, GDerivedMethods>> {
  const traitMethodsArrayA: TGenericMethodStruct[] = ToArray(this.methods);
  const traitMethodsArrayB: TGenericMethodStruct[] = ToArray(methods);

  return {
    methods: traitMethodsArrayA
      .filter((traitMethodA: TGenericMethodStruct) => {
        return traitMethodsArrayB.every((traitMethodB: TGenericMethodStruct, index: number) => {
          if (traitMethodA.propertyKey === traitMethodB.propertyKey) {
            if (CallFunction(MethodIsDerivedFrom, traitMethodB, [traitMethodA])) {
              return false;
            } else {
              throw new Error(`Received a new Method with the property key '${ String(traitMethodB.propertyKey) }' at index ${ index }, which already exists in this Trait and is not derived from the original`);
            }
          } else {
            return true;
          }
        });
      })
      .concat(traitMethodsArrayB)
  };
}

