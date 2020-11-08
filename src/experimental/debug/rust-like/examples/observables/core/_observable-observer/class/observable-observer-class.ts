import {
  IObservableObserverPrivateContext,
  IObservableObserverStruct,
  OBSERVABLE_OBSERVER_PRIVATE_CONTEXT,
} from '../struct/observable-observer-struct';
import { AssembleTraitImplementations } from '../../../../../core/apply-trait-implementation';
import { CreatePrivateContext } from '../../../../../../../class-helpers/private/create-private-context';
import { IsObservableLike, TGenericObservableLike } from '../../observable/observable-types';
import { IsObserverLike, TGenericObserverLike } from '../../observer/observer-types';
import { ImplTraitGetObservableForObservableObserverStruct } from '../struct/implementations/observable-observer-struct-get-observable-implementation';
import { ImplTraitGetObserverForObservableObserverStruct } from '../struct/implementations/observable-observer-struct-get-observer-implementation';

/** CONSTRUCTOR **/

export function ConstructObservableObserver<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike>(
  instance: IObservableObserverStruct<GObserver, GObservable>,
  observer: GObserver,
  observable: GObservable,
): void {
  if (!IsObservableLike(observable)) {
    throw new TypeError(`The argument 'observable' is not an Observable.`);
  }

  if (!IsObserverLike(observer)) {
    throw new TypeError(`The argument 'observer' is not an Observer.`);
  }

  CreatePrivateContext<IObservableObserverPrivateContext<GObserver, GObservable>>(
    OBSERVABLE_OBSERVER_PRIVATE_CONTEXT,
    instance,
    {
      observable,
      observer,
    },
  );
}

/** CLASS **/

export interface IObservableObserver<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike> extends IObservableObserverStruct<GObserver, GObservable>,
  ImplTraitGetObservableForObservableObserverStruct<IObservableObserver<GObserver, GObservable>>,
  ImplTraitGetObserverForObservableObserverStruct<IObservableObserver<GObserver, GObservable>> {
}

export interface IAssembledObservableObserverImplementations {
  new<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike>(): IObservableObserver<GObserver, GObservable>;
}

export const ObservableObserverImplementationsCollection = [
  ImplTraitGetObservableForObservableObserverStruct,
  ImplTraitGetObserverForObservableObserverStruct,
];

const AssembledObservableObserverImplementations = AssembleTraitImplementations<IAssembledObservableObserverImplementations>(ObservableObserverImplementationsCollection);

export class ObservableObserver<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike> extends AssembledObservableObserverImplementations<GObserver, GObservable> implements IObservableObserver<GObserver, GObservable> {
  readonly [OBSERVABLE_OBSERVER_PRIVATE_CONTEXT]: IObservableObserverPrivateContext<GObserver, GObservable>;

  constructor(
    observer: GObserver,
    observable: GObservable,
  ) {
    super();
    ConstructObservableObserver<GObserver, GObservable>(this, observer, observable);
  }
}
