import { IMethodStruct } from '../method-struct-definition';
import { TGenericMethodStruct, TInferMethodFunction, TInferMethodPropertyKey } from '../method-types';
import {
  GetMethodStructConfigurable, GetMethodStructEnumerable, GetMethodStructWritable
} from '../functions/method-implement-for';

/**
 * @constructor
 */
export function MethodClassNew<GThis extends TGenericMethodStruct>(
  this: GThis,
  options: IMethodStruct<TInferMethodPropertyKey<GThis>, TInferMethodFunction<GThis>>
): GThis {
  this.propertyKey = options.propertyKey;
  this.value = options.value;
  this.enumerable = GetMethodStructEnumerable(options.enumerable);
  this.configurable = GetMethodStructConfigurable(options.configurable);
  this.writable = GetMethodStructWritable(options.writable);
  return this;
}
