import { TGenericMethodStruct } from '../method/method-types';

/**
 * A trait is simply a collection of methods
 * INFO: GMethods is an union
 */
export interface ITraitStruct<GMethods extends TGenericMethodStruct> {
  methods: Iterable<GMethods>;
}

