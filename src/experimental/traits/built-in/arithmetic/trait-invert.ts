import { CreateAbstractMethodCallError } from '../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../trait/trait-class';

export abstract class TraitInvert<GReturn = unknown> extends Trait {
  invert(): GReturn {
    throw CreateAbstractMethodCallError('invert');
  }
}

export type TInferTraitInvertReturn<GTraitInvert extends TraitInvert<any>> =
  GTraitInvert extends TraitInvert<infer GReturn>
    ? GReturn
    : never;


