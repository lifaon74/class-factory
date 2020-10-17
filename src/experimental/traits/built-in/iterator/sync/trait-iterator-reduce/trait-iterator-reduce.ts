import { CreateAbstractMethodCallError } from '../../../../../class-helpers/abstract/create-abstract-method-error';
import { Trait } from '../../../../trait/trait-class';
import { TIteratorReduceCallback } from './iterator-reduce';


export abstract class TraitIteratorReduce<GValue> extends Trait {
  reduce(callback: TIteratorReduceCallback<GValue, GValue>): GValue;
  reduce<GReducedValue>(callback: TIteratorReduceCallback<GValue, GReducedValue>, initialValue: GReducedValue): GReducedValue;
  reduce(callback: TIteratorReduceCallback<GValue, any>, initialValue?: any): any {
    throw CreateAbstractMethodCallError('reduce');
  }
}

