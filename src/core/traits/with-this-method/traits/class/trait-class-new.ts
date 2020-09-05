import { TGenericTraitStruct, TInferTraitMethods } from '../trait-types';
import { ITraitStruct } from '../trait-struct-definition';
import { TGenericMethodStruct } from '../../method/method-types';

/**
 * @constructor
 */
export function TraitClassNew<GThis extends TGenericTraitStruct>(
  this: GThis,
  options: ITraitStruct<TInferTraitMethods<GThis>>
): GThis {
  const methods = Object.freeze(Array.from(options.methods));

  for (let i = 0, l = methods.length - 1; i < l; i++) {
    const method: TGenericMethodStruct = methods[i];
    for (let j = i + 1; j <= l; j++) {
      if (method.propertyKey === methods[j].propertyKey) {
        throw new Error(`Received two Method with the same property key '${ String(method.propertyKey) }' at index ${ i } and ${ j }`);
      }
    }
  }

  this.methods = methods;

  return this;
}
