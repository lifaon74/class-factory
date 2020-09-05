import { ITraitStruct } from '../trait-struct-definition';
import { ITrait, ITraitConstructor, TTraitClassTypedTraitStruct } from './trait-class-definition';
import {
  TClassToTrait, TClassTrait, TGenericTraitStruct, TInferTraitMethods, TTraitToClassConstructorWithVoidAllowed
} from '../trait-types';
import { TraitClassNew } from './trait-class-new';
import { CallFunction } from '../../derived-function/call-function';
import { CreateTraitToClassMethodStruct } from './methods/trait-to-class';
import { TraitToClass } from '../functions/trait-to-class';
import { TGenericMethodStruct } from '../../method/method-types';
import { ClassToTrait } from '../functions/static/class-to-trait';
import { CreateTraitImplementForTraitStruct } from './methods/trait-implement-for';
import { CreateTraitIsImplementedByTraitStruct } from './methods/trait-is-implemented-by';

const TraitClassTrait: TTraitClassTypedTraitStruct<TGenericTraitStruct> = {
  methods: [
    CreateTraitImplementForTraitStruct(),
    CreateTraitIsImplementedByTraitStruct(),
    CreateTraitToClassMethodStruct(),
  ],
};

const TraitClassTraitAsClass: TTraitToClassConstructorWithVoidAllowed<typeof TraitClassTrait, void> = CallFunction(TraitToClass, TraitClassTrait, []);


export const Trait =
  class Trait<GMethods extends TGenericMethodStruct> extends TraitClassTraitAsClass implements ITrait<GMethods> {
    static fromClass<GClass extends TClassTrait<any>>(
      _class: GClass
    ): ITrait<TInferTraitMethods<TClassToTrait<GClass>>> {
      return new Trait<TInferTraitMethods<TClassToTrait<GClass>>>(ClassToTrait<GClass>(_class));
    }

    readonly methods: ReadonlyArray<GMethods>;

    constructor(options: ITraitStruct<GMethods>) {
      super();
      CallFunction(TraitClassNew, this, [options]);
    }
  } as ITraitConstructor;




