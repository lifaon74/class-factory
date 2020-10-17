import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { TraitIterable } from '../iterator/sync/trait-iterable/trait-iterable';


export abstract class TraitMapLike<GKey, GValue> extends TraitIterable<[GKey, GValue]> {
  // get(key: K): V | undefined;
}

new Map()
