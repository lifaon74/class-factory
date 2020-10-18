import { CreateMethodImplementForMethodStruct } from './methods/method-implement-for';
import { TraitToClass } from '../../traits/functions/trait-to-class';
import { IMethodStruct } from '../method-struct-definition';
import { IMethod, IMethodConstructor, TMethodClassTypedTraitStruct } from './method-class-definition';
import { TTraitToClassConstructorWithVoidAllowed } from '../../traits/trait-types';
import { TGenericMethodStruct } from '../method-types';
import { CreateMethodIsImplementedByMethodStruct } from './methods/method-is-implemented-by';
import { MethodClassNew } from './method-class-new';
import { CreateMethodCallMethodStruct } from './methods/method-call';
import { TGenericFunction } from '../../../../types/misc-types';
import { CallFunction } from '../../derived-function/call-function';
import { CreateMethodDeriveMethodStruct } from './methods/method-derive';
import { CreateMethodEqualsMethodStruct } from './methods/method-equals';
import { CreateMethodIsDerivedFromMethodStruct } from './methods/method-is-derived-from';

const MethodClassTrait: TMethodClassTypedTraitStruct<TGenericMethodStruct> = {
  methods: [
    CreateMethodCallMethodStruct(),
    CreateMethodDeriveMethodStruct(),
    CreateMethodEqualsMethodStruct(),
    CreateMethodImplementForMethodStruct(),
    CreateMethodIsImplementedByMethodStruct(),
    CreateMethodIsDerivedFromMethodStruct(),
  ],
};

const MethodClassTraitAsClass: TTraitToClassConstructorWithVoidAllowed<typeof MethodClassTrait, void> = CallFunction(TraitToClass, MethodClassTrait, []);


export const Method =
  class Method<GPropertyKey extends PropertyKey, GFunction extends TGenericFunction> extends MethodClassTraitAsClass implements IMethod<GPropertyKey, GFunction> {
    readonly value: GFunction;
    readonly propertyKey: GPropertyKey;
    readonly enumerable: boolean;
    readonly configurable: boolean;
    readonly writable: boolean;

    constructor(options: IMethodStruct<GPropertyKey, GFunction>) {
      super();
      CallFunction(MethodClassNew, this, [options]);
    }
  } as IMethodConstructor;




