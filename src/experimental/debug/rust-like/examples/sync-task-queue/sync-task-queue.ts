

export type TSyncTask = () => void;

export class SyncTaskQueue {
  protected readonly _tasks: TSyncTask[];
  protected readonly _dequeueing: boolean;

  constructor() {
    this._tasks = [];
    this._dequeueing = false;
  }

  queue(task: TSyncTask): this {
    this._tasks.push(task);
    return this;
  }

  dequeue(): this {
    while (this._tasks.length > 0) {
      (this._tasks.shift() as TSyncTask)();
    }
    return this;
  }
}
