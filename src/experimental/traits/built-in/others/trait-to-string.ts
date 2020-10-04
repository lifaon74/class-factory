import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { ReflectTraitOnGlobalVariables } from '../../trait/trait-functions';
import { Trait } from '../../trait/trait-class';

export abstract class TraitToString extends Trait {
  toString(): string {
    throw CreateAbstractMethodCallError('toString');
  }
}


export function ReflectTraitToStringOnNativeObjects() {
  ReflectTraitOnGlobalVariables(TraitToString, 'toString');
}


// RegisterChildFunction(Object.prototype.toString, TraitToString.prototype.toString);
// RegisterChildFunction(Number.prototype.toString, TraitToString.prototype.toString);
// RegisterChildFunction(Function.prototype.toString, TraitToString.prototype.toString);
// RegisterChildFunction(String.prototype.toString, TraitToString.prototype.toString);
