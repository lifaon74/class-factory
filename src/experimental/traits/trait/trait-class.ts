const TRAIT_SYMBOL: unique symbol = Symbol('trait');

export abstract class Trait {
  [TRAIT_SYMBOL]: undefined;
}
