import { TraitArrayLike } from './trait-array-like';
import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { TIterateFunction } from './array-types';

export abstract class TraitArrayFilter<GValue> extends TraitArrayLike<GValue> {
  filter(callback: TIterateFunction<GValue, this, boolean>): this {
    throw CreateAbstractMethodCallError('filter');
  }
}


// /*--*/
//
// export abstract class TraitArrayFilterUsingAllocAndNativeArrayFilter<GValue> extends mixTraitsAsUnion([TraitArrayLike, TraitAlloc], Trait) {
//   filter(callback: TIterateFunction<GValue, this, boolean>): this {
//     return this[ALLOC](
//       Array.from(this).filter(callback as any, this),
//     ) as this;
//   }
// }
//
//
// /*--*/
// // INFO: could use ALLOC and .push too
