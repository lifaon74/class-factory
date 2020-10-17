import { GetPrototypeOf } from '../../object-helpers/object-get-prototype-of';
import { DefineProperty } from '../../object-helpers/object-define-property';
import { GetOwnPropertyDescriptors } from '../../object-helpers/object-get-own-property-descriptors';
import { TGenericFunction } from '../../types/function-types';
import { TAbstractClass, TConstructor } from '../../types/class-types';
import { IsNotReservedPropertyName } from '../../object-helpers/reserved-property-name';
import { HasProperty } from '../../object-helpers/object-has-property';
import { TupleToIntersection } from '../../../core/types/misc-types';


const GET_PROTOTYPE_OF_OBJECT = GetPrototypeOf(Object);

function ExtractTraitOrImplementationOwnMethods(target: any, errorPrefix: string): readonly IMethod[] {
  return Object.freeze(
    Array
      .from(GetOwnPropertyDescriptors(target))
      .filter(([propertyKey]) => IsNotReservedPropertyName(propertyKey))
      .map(([propertyKey, descriptor]) => {
        if (typeof descriptor.value === 'function') {
          return {
            propertyKey,
            descriptor,
          };
        } else {
          throw new TypeError(`${ errorPrefix }: for property '${ String(propertyKey) }' - only functions are accepted`);
        }
      }),
  );
}

/**
 * Structure which represents a method
 */
interface IMethod {
  readonly propertyKey: PropertyKey,
  readonly descriptor: TypedPropertyDescriptor<TGenericFunction>;
}

/**
 * Structure which represents a Trait
 */
interface ITraitDetails {
  readonly trait: TAbstractClass,
  readonly ownMethods: readonly IMethod[];
  readonly parent: ITraitDetails | undefined;
}

// map from a trait class to the details of this trait
const TRAITS = new WeakMap<TAbstractClass, ITraitDetails>();

/**
 * DECORATOR - for class
 * Registers an abstract class as a Trait
 */
export function Trait(): ClassDecorator {
  return (target: Function): void => {
    if (typeof target === 'function') {
      if (TRAITS.has(target)) {
        throw new Error(`@Trait<${ target.name }>: already registered as a trait`);
      } else {
        const parent: any = GetPrototypeOf(target);
        if (
          (parent === GET_PROTOTYPE_OF_OBJECT)
          || (parent === null)
          || TRAITS.has(parent)
        ) {
          TRAITS.set(target, Object.freeze({
            trait: target,
            ownMethods: ExtractTraitOrImplementationOwnMethods(target.prototype, `@Trait<${ target.name }>:`),
            parent: TRAITS.get(parent),
          }));
        } else {
          throw new Error(`@Trait<${ target.name }>: provided trait (class) must extends another trait or nothing`);
        }
      }
    } else {
      throw new TypeError(`@Trait: expects a class`);
    }
  };
}

export function IsTrait(input: any): input is TAbstractClass {
  return TRAITS.has(input);
}

/*-----*/

/**
 * Structure which represents an Implementation
 */
interface IImplementationDetails {
  readonly implementation: Function,
  readonly ownMethods: readonly IMethod[];
  readonly forTrait: ITraitDetails;
}

// map from a implementation class to the details of this implementation
const IMPLEMENTATIONS = new WeakMap<Function, IImplementationDetails>();


/**
 * DECORATOR - for class
 * Registers a class as an Implementation
 */
export function Impl(): ClassDecorator {
  return (target: Function): void => {
    if (typeof target === 'function') {
      if (IMPLEMENTATIONS.has(target)) {
        throw new Error(`@Impl<${ target.name }>: already registered as an implementation`);
      } else {
        const trait = GetPrototypeOf(target);
        if (TRAITS.has(trait)) {
          IMPLEMENTATIONS.set(target, Object.freeze({
            implementation: target,
            ownMethods: ExtractTraitOrImplementationOwnMethods(target.prototype, `@Impl<${ target.name }>:`),
            forTrait: TRAITS.get(trait) as ITraitDetails,
          }));
        } else {
          throw new Error(`@Impl<${ target.name }>: the implementation is not extending a trait`);
        }
      }
    } else {
      throw new TypeError(`@Impl: expects a class`);
    }
  };
}

export function IsImpl(input: any): input is TConstructor {
  return IMPLEMENTATIONS.has(input);
}


/*-----*/

// map from a variable to the list of its implementations
const ANY_TO_IMPLEMENTATIONS_MAP = new WeakMap<any, Set<IImplementationDetails>>();

/**
 * Implements a method on target.
 *  - skips implementation if method has already been implemented from 'implementedProperties'
 *  - else, throws if method is already implemented on 'target'
 */
function ImplementMethod(
  target: any,
  method: IMethod,
  implementedProperties: Set<PropertyKey>,
): void {
  const propertyKey: PropertyKey = method.propertyKey;
  if (!implementedProperties.has(propertyKey)) {
    if (HasProperty(target, propertyKey) && (target[propertyKey] !== Object.prototype[propertyKey])) {
      throw new Error(`The target of the implementation has already the property '${ String(propertyKey) }'`);
    } else {
      DefineProperty(target, propertyKey, method.descriptor);
      implementedProperties.add(propertyKey);
    }
  }
}

/**
 * Returns true if 'traitDetails' is or extends 'trait'
 */
function TraitExtendsTrait(
  traitDetails: ITraitDetails | undefined,
  trait: TAbstractClass,
): boolean {
  while (traitDetails !== void 0) {
    if (traitDetails.trait === trait) {
      return true;
    }
    traitDetails = traitDetails.parent;
  }
  return false;
}

/**
 * Returns true if 'traitImplementationDetails' extends 'trait'
 */
function ImplementationExtendsTrait(
  traitImplementationDetails: IImplementationDetails,
  trait: TAbstractClass,
): boolean {
  return TraitExtendsTrait(traitImplementationDetails.forTrait, trait);
}

function GenerateNotAndImplementationErrorMessage(traitImplementation: TConstructor): string {
  return `'${ traitImplementation.name }' is not an implementation. Did you forgot the decorator @Impl() ?`;
}

function GetImplementationDetailsOrThrow(
  traitImplementation: TConstructor,
): IImplementationDetails {
  if (IMPLEMENTATIONS.has(traitImplementation)) {
    return IMPLEMENTATIONS.get(traitImplementation) as IImplementationDetails;
  } else {
    throw new Error(GenerateNotAndImplementationErrorMessage(traitImplementation));
  }
}

function GetManyImplementationDetails(
  traitImplementations: TConstructor[],
): IImplementationDetails[] {
  return traitImplementations
    .map((traitImplementation: TConstructor) => {
      return GetImplementationDetailsOrThrow(traitImplementation);
    });
}


/**
 * Applies an Implementation on 'target':
 *  - reflects the implementation's methods (including extended traits) on 'target'
 *  - marks 'target' has implementing 'traitImplementation'
 */
export function ApplyTraitImplementation(
  target: any,
  traitImplementation: TConstructor,
): void {
  if (IMPLEMENTATIONS.has(traitImplementation)) {
    const traitImplementationDetails: IImplementationDetails = IMPLEMENTATIONS.get(traitImplementation) as IImplementationDetails;

    let implemented: Set<IImplementationDetails>;

    if (ANY_TO_IMPLEMENTATIONS_MAP.has(target)) {
      implemented = ANY_TO_IMPLEMENTATIONS_MAP.get(target) as Set<IImplementationDetails>;
    } else {
      implemented = new Set<IImplementationDetails>();
      ANY_TO_IMPLEMENTATIONS_MAP.set(target, implemented);
    }

    if (implemented.has(traitImplementationDetails)) {
      throw new Error(`Implementation already applied for this target`);
    } else {
      const implementedProperties: Set<PropertyKey> = new Set<PropertyKey>();
      const ownMethods: readonly IMethod[] = traitImplementationDetails.ownMethods;
      for (let i = 0, l = ownMethods.length; i < l; i++) {
        ImplementMethod(
          target,
          ownMethods[i],
          implementedProperties,
        );
      }

      let trait: ITraitDetails | undefined = traitImplementationDetails.forTrait;
      while (trait !== void 0) {
        const ownMethods: readonly IMethod[] = trait.ownMethods;
        for (let i = 0, l = ownMethods.length; i < l; i++) {
          ImplementMethod(
            target,
            ownMethods[i],
            implementedProperties,
          );
        }
        trait = trait.parent;
      }

      implemented.add(traitImplementationDetails);
    }
  } else {
    throw new Error(GenerateNotAndImplementationErrorMessage(traitImplementation));
  }
}


/**
 * Creates a new class which implements many Implementations
 */
export function AssembleTraitImplementations<GAssembledImplementations extends TConstructor>(
  traitImplementations: TConstructor[],
  baseClass?: TConstructor,
): GAssembledImplementations {
  const _class: any = (baseClass === void 0)
    ? class Impl {}
    : class Impl extends baseClass {};

  for (let i = 0, l = traitImplementations.length; i < l; i++) {
    const traitImplementation: TConstructor = traitImplementations[i];
    ApplyTraitImplementation(_class.prototype, traitImplementation);
  }

  return _class;
}


/**
 * Removes from 'traitImplementations' (doesn't modify original array) all implementations overridden (sharing similar traits) by 'newTraitImplementations'
 * and appends (concat) 'newTraitImplementations',
 */
export function OverrideTraitImplementations(
  traitImplementations: TConstructor[],
  newTraitImplementations: TConstructor[],
): TConstructor[] {
  const newTraitImplementationsDetails: IImplementationDetails[] = GetManyImplementationDetails(newTraitImplementations);
  return traitImplementations
    .filter((traitImplementation: TConstructor) => {
      const traitImplementationDetails: IImplementationDetails = GetImplementationDetailsOrThrow(traitImplementation);
      return newTraitImplementationsDetails
        .every((newTraitImplementationDetails: IImplementationDetails) => {
          return !ImplementationExtendsTrait(traitImplementationDetails, newTraitImplementationDetails.forTrait.trait);
        });
    })
    .concat(newTraitImplementations)
}



export type TWithImplementedTrait<GTarget, GTrait> = GTrait & GTarget;

/**
 * Returns true if 'trait' is implemented by 'target'
 */
export function TraitIsImplementedBy<GTrait, GTarget>(
  trait: TAbstractClass<GTrait>,
  target: GTarget,
): target is TWithImplementedTrait<GTarget, GTrait> {
  if (TRAITS.has(trait)) {
    while (target !== null) {
      if (ANY_TO_IMPLEMENTATIONS_MAP.has(target)) {
        const implementedImplementations: Set<IImplementationDetails> = ANY_TO_IMPLEMENTATIONS_MAP.get(target) as Set<IImplementationDetails>;
        const iterator: Iterator<IImplementationDetails> = implementedImplementations.values();
        let result: IteratorResult<IImplementationDetails>;
        while (!(result = iterator.next()).done) {
          if (ImplementationExtendsTrait(result.value, trait)) {
            return true;
          }
        }
      }
      target = GetPrototypeOf(target);
    }
    return false;
  } else {
    throw new TypeError(`Provided 'trait' argument is not a trait`);
  }
}


export type TWithImplementedTraits<GTarget, GTraits extends any[]> = TupleToIntersection<GTraits> & GTarget;

/**
 * Returns true if all the 'traits' are implemented by 'target'
 */
export function TraitsAreImplementedBy<GTraits extends any[], GTarget>(
  traits: { [GKey in keyof GTraits]: TAbstractClass<GTraits[GKey]> },
  target: GTarget,
): target is TWithImplementedTraits<GTarget, GTraits> {
  return traits.every((trait: TAbstractClass<any>) => {
    return TraitIsImplementedBy(trait, target);
  });
}
