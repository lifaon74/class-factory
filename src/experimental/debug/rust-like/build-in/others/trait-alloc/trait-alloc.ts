import { Trait } from '../../../core/trait-decorator';

export const ALLOC = Symbol('alloc');

@Trait()
export abstract class TraitAlloc<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract [ALLOC](this: GSelf, data: GValue): GReturn;
}