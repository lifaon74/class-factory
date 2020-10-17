import { DefineProperty } from '../../object-helpers/object-define-property';
import { TGenericTrait, TInferTraitPropertyKeys, TInferTraitPrototype } from './trait-types';

export type TDefineTraitMethodDescriptor = Pick<PropertyDescriptor, 'configurable' | 'enumerable' | 'writable'>;

export function DefineTraitMethod<GTrait extends TGenericTrait, GPropertyKey extends TInferTraitPropertyKeys<GTrait>>(
  trait: GTrait,
  propertyKey: TInferTraitPropertyKeys<GTrait>,
  method: TInferTraitPrototype<GTrait>[GPropertyKey],
  descriptor: TDefineTraitMethodDescriptor = {}
): void {
  DefineProperty(trait.prototype, propertyKey, {
    writable: true,
    enumerable: false,
    configurable: true,
    ...descriptor,
  });
}
