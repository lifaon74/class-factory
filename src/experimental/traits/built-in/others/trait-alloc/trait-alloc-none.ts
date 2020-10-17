import { ALLOC, TAllocData, TraitAllocOLD } from './trait-alloc';

/**
 * An <Alloc> trait which returns 'data'
 * INFO: use this one if you work directly with objects (implementTrait), and you don't want to keep inherited properties
 */
export abstract class TraitAllocNone<GData extends TAllocData> extends TraitAllocOLD<GData> {
  [ALLOC](data: GData): GData {
    return data;
  }
}

