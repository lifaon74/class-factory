
const TRAIT_SYMBOL: unique symbol = Symbol('trait');

export abstract class Trait {
  [TRAIT_SYMBOL]: undefined;
}

export type TraitWithoutSymbol<GTraitPrototype extends Trait> = Omit<GTraitPrototype, typeof TRAIT_SYMBOL>;
