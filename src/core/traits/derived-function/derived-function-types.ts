import { TGenericFunction } from '../../types/misc-types';
import { TGenericMethodStruct, TInferMethodFunction, TInferMethodPropertyKey } from '../method/method-types';

// /**
//  * Type composed of the intersection of 'GTarget' and { [GPropertyKey]: GFunction }
//  *  => appends a method to an object
//  */
// export type TWithImplementedFunction<GTarget, GPropertyKey extends PropertyKey, GFunction extends TGenericFunction> =
//   GTarget
//   & Record<GPropertyKey, GFunction>;

