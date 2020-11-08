import { EventListener } from '../event-listener/class/event-listener-class';

type OnEmit<GValue> = (value: GValue) => void;
type TInferOnEmitGValue<GFunction extends OnEmit<any>> =
  GFunction extends OnEmit<infer GValue>
    ? GValue
    : never;

abstract class AbstractObserver<GValue> {
  abstract readonly emit: OnEmit<GValue>;
}

class Observer<GValue> extends AbstractObserver<GValue> {
  readonly emit: OnEmit<GValue>;

  constructor(emit: OnEmit<GValue>) {
    super();
    this.emit = emit;
  }
}


/*--*/


interface IAbstractObservableEventMap<GValue> {
  'add-observer': AbstractObserver<GValue>;
  'remove-observer': AbstractObserver<GValue>;
  'active': void;
  'inactive': void;
}

abstract class AbstractObservable<GValue> extends EventListener<IAbstractObservableEventMap<GValue>> {

  abstract isActive(): boolean;

  // abstract getObservers(): readonly AbstractObserver<GValue>[];

  abstract addObserver(observer: AbstractObserver<GValue>): this;

  abstract removeObserver(observer: AbstractObserver<GValue>): this;

  pipeTo<GCallback extends OnEmit<GValue>>(callback: GCallback): Subscription<this, Observer<GValue>>;
  pipeTo<GObserver extends AbstractObserver<GValue>>(observer: GObserver): Subscription<this, GObserver>;
  pipeTo(observerOrCallback: any): Subscription<this, AbstractObserver<GValue>> {
    const observer: AbstractObserver<GValue> = (typeof observerOrCallback === 'function')
      ? new Observer<GValue>(observerOrCallback)
      : observerOrCallback;
    return new Subscription<this, AbstractObserver<GValue>>(this, observer);
  }

  pipeThrough<GObservableObserver extends IObservableObserver<any, any>>(observableObserver: GObservableObserver): GObservableObserver['observable'] {
    return new PipeThrough<this, GObservableObserver>(this, observableObserver)
      .activate()
      .observable;
  }
}


type ObservableEmitFunction<GValue> = (value: GValue) => void;
type ObservableCreateFunction<GValue> = (emit: ObservableEmitFunction<GValue>, observable: AbstractObservable<GValue>) => void;

class Observable<GValue> extends AbstractObservable<GValue> {
  protected readonly _observers: AbstractObserver<GValue>[];

  constructor(create?: ObservableCreateFunction<GValue>) {
    super();
    this._observers = [];
    if (create !== void 0) {
      create((value: GValue) => {
        for (let i = 0, l = this._observers.length; i < l; i++) {
          this._observers[i].emit(value);
        }
      }, this);
    }
  }

  isActive(): boolean {
    return this._observers.length > 0;
  }

  getObservers(): readonly AbstractObserver<GValue>[] {
    return this._observers;
  }

  addObserver(observer: AbstractObserver<GValue>): this {
    this._observers.push(observer);
    this.dispatch('add-observer', observer);
    if (this._observers.length === 1) {
      this.dispatch('active', void 0);
    }
    return this;
  }

  removeObserver(observer: AbstractObserver<GValue>): this {
    this._observers.splice(this._observers.indexOf(observer));
    this.dispatch('remove-observer', observer);
    if (this._observers.length === 0) {
      this.dispatch('inactive', void 0);
    }
    return this;
  }
}

/*--*/

interface IObservableObserver<GObserver extends AbstractObserver<any>, GObservable extends AbstractObservable<any>> {
  observer: GObserver;
  observable: GObservable;
}

/*--*/

class TimerObservable extends Observable<void> {
  readonly timeout: number;

  protected _timer: any | null;

  constructor(timeout: number) {
    super((emit: ObservableEmitFunction<void>, observable: AbstractObservable<void>) => {
      observable.on('active', () => {
        console.log('start timer');
        this._timer = setInterval(emit, this.timeout);
      });
      observable.on('inactive', () => {
        console.log('clear timer');
        clearInterval(this._timer);
      });
    });
    this.timeout = timeout;
    this._timer = null;
  }
}

// class TimerObservable extends Observable<void> {
//   readonly timeout: number;
//
//   protected _timer: any | null;
//
//   constructor(timeout: number) {
//     super();
//     this.timeout = timeout;
//     this._timer = null;
//   }
//
//   addObserver(observer: AbstractObserver<void>): void {
//     super.addObserver(observer);
//     if (this._timer === null) {
//       setInterval(() => {
//         ObservableDispatchAll(this, void 0);
//       }, this.timeout);
//     }
//   }
//
//   removeObserver(observer: AbstractObserver<void>): void {
//     super.removeObserver(observer);
//     if (this.observers.length === 0) {
//       clearInterval(this._timer);
//       this._timer = null;
//     }
//   }
// }

/*--*/

class FromIterableObservable<GValue> extends Observable<GValue> {
  constructor(iterable: Iterable<GValue>) {
    const array = Array.isArray(iterable)
      ? iterable
      : Array.from(iterable);
    super((emit: ObservableEmitFunction<GValue>, observable: AbstractObservable<GValue>) => {
      observable.on('add-observer', () => {
        for (let i = 0, l = array.length; i < l; i++) {
          emit(array[i]);
        }
      });
    });
  }
}

/*--*/

class PipeThrough<GObservable extends AbstractObservable<any>, GObservableObserver extends IObservableObserver<any, any>> {
  public readonly observable: GObservableObserver['observable'];

  protected _subscription: Subscription<GObservable, GObservableObserver['observer']>;
  protected _undo: (() => void) | null;

  constructor(
    observable: GObservable,
    observableObserver: GObservableObserver,
  ) {
    this._subscription = new Subscription<GObservable, GObservableObserver['observer']>(observable, observableObserver.observer);
    this._undo = null;
    this.observable = observableObserver.observable;
  }

  isActivated(): boolean {
    return this._undo !== null;
  }

  activate(): this {
    if (this._undo === null) {
      const undoActiveListener = this.observable.on('active', () => this._subscription.activate());
      const undoInactiveListener = this.observable.on('inactive', () => this._subscription.deactivate());
      this._undo = () => {
        undoActiveListener();
        undoInactiveListener();
      };
      if (this.observable.isActive()) {
        this._subscription.activate();
      }
    }
    return this;
  }

  deactivate(): this {
    if (this._undo !== null) {
      this._undo();
      this._undo = null;
    }
    return this;
  }

  toggle(activate: boolean = !this.isActivated()): this {
    if (activate) {
      return this.activate();
    } else {
      return this.deactivate();
    }
  }
}

class Subscription<GObservable extends AbstractObservable<any>, GObserver extends AbstractObserver<any>> {
  readonly observable: GObservable;
  readonly observer: GObserver;

  protected _activated: boolean;

  constructor(
    observable: GObservable,
    observer: GObserver,
  ) {
    this.observable = observable;
    this.observer = observer;
    this._activated = false;
  }

  isActivated(): boolean {
    return this._activated;
  }

  activate(): this {
    if (!this._activated) {
      this._activated = true;
      this.observable.addObserver(this.observer);
    }
    return this;
  }

  deactivate(): this {
    if (this._activated) {
      this._activated = false;
      this.observable.removeObserver(this.observer);
    }
    return this;
  }

  toggle(activate: boolean = !this.isActivated()): this {
    if (activate) {
      return this.activate();
    } else {
      return this.deactivate();
    }
  }
}

/*--*/

class Pipe<GValueIn, GValueOut> {
  readonly observer!: Observer<GValueIn>;
  readonly observable: Observable<GValueOut>;

  constructor(onEmit: (value: GValueIn, emit: (value: GValueOut) => void) => void) {
    this.observable = new Observable<GValueOut>((emit: ObservableEmitFunction<GValueOut>) => {
      (this.observer as Observer<GValueIn>) = new Observer((value: GValueIn) => {
        onEmit(value, emit);
      });
    });
  }

  // constructor(onEmit: (emit: (value: GValueOut) => void) => ((value: GValueIn) => void)) {
  //   this.observable = new Observable<GValueOut>((emit: ObservableEmitFunction<GValueOut>) => {
  //     (this.observer as Observer<GValueIn>) = new Observer(onEmit(emit));
  //   });
  // }
}

function map<GValueIn, GValueOut>(mapFunction: (value: GValueIn) => GValueOut) {
  return new Pipe<GValueIn, GValueOut>((value: GValueIn, emit: (value: GValueOut) => void) => {
    emit(mapFunction(value));
  });

  // return new Pipe<GValueIn, GValueOut>((emit: ((value: GValueOut) => void)) => {
  //   return (value: GValueIn) => emit(mapFunction(value));
  // });
}

class MapPipe<GValueIn, GValueOut> {
  readonly observer!: Observer<GValueIn>;
  readonly observable: Observable<GValueOut>;

  constructor(mapFunction: (value: GValueIn) => GValueOut) {
    this.observable = new Observable<GValueOut>((emit: ObservableEmitFunction<GValueOut>) => {
      (this.observer as Observer<GValueIn>) = new Observer((value: GValueIn) => {
        emit(mapFunction(value));
      });
    });
  }
}


export async function debugObservable1() {
  const sub = new TimerObservable(500)
    // .pipeThrough(new MapPipe<void, number>(() => Math.random()))
    .pipeThrough(map(() => Math.random()))
    .pipeTo(new Observer<number>((value: number) => {
      console.log('receive', value);
      sub.deactivate();
    }));
  sub.activate();

  setTimeout(() => sub.deactivate(), 2000);
}


export async function testObservablePerfs() {

  const range = (length: number) => {
    return Array.from({ length }, (v: any, i: number) => i);
  };

  const testSimpleEmit = () => { // 328.2861328125 ms
    let sum: number = 0;

    const sub = new FromIterableObservable(range(1e7))
      .pipeTo((value: number) => {
        sum += value;
      });

    console.time('perf');
    sub.activate();
    console.timeEnd('perf');

    console.log('sum', sum);
  };

  const testMap = () => { // 729.5791015625 ms
    let sum: number = 0;

    const sub = new FromIterableObservable(range(1e7))
      .pipeThrough(new MapPipe<number, number>(_ => (_ * 2)))
      .pipeTo((value: number) => {
        sum += value;
      });

    console.time('perf');
    sub.activate();
    console.timeEnd('perf');

    console.log('sum', sum);
  };

  const testActivate = () => { // 2026.498046875 ms
    let sum: number = 0;
    const sub = new FromIterableObservable(range(1e2))
      .pipeTo((value: number) => {
        sum += value;
      });

    console.time('perf');
    for (let i = 0; i < 1e6; i++) {
      sub.activate().deactivate();
    }
    console.timeEnd('perf');

    console.log('sum', sum);
  };

  const testActivateWithPipe = () => { // 1067.233154296875 ms
    let sum: number = 0;
    const sub = new FromIterableObservable(range(1e2))
      .pipeThrough(new MapPipe<void, number>(() => Math.random()))
      .pipeTo((value: number) => {
        sum += value;
      });

    console.time('perf');
    for (let i = 0; i < 1e5; i++) {
      sub.activate().deactivate();
    }
    console.timeEnd('perf');

    console.log('sum', sum);
  };

  const testConstruct = () => { // 1207.3759765625 ms
    let sum: number = 0;
    const array = range(1e2);


    console.time('perf');
    for (let i = 0; i < 1e5; i++) {
      new FromIterableObservable(array)
        .pipeThrough(new MapPipe<void, number>(() => Math.random()))
        .pipeTo((value: number) => {
          sum += value;
        })
        .activate();
    }
    console.timeEnd('perf');

    console.log('sum', sum);
  };

  // testSimpleEmit();
  // testMap();
  // testActivate();
  // testActivateWithPipe();
  testConstruct();
}

export async function debugObservableUsingClasses() {
  await debugObservable1();
  // await testObservablePerfs();
}
