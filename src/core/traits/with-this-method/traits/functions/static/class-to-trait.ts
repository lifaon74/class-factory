import { TClassToTrait, TClassTrait } from '../../trait-types';
import { ClassToMethodsMap } from './class-to-methods-map';

/**
 * Returns a TraitStruct built from a class
 */
export function ClassToTrait<GClass extends TClassTrait<any>>(
  _class: GClass
): TClassToTrait<GClass> {
  return {
    methods: Array.from(ClassToMethodsMap<GClass>(_class).values())
  };
}

