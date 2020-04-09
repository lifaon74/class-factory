
export interface Constructor<Instance = any, Args extends any[] = any[]> extends Function {
  new(...args: Args): Instance;
}

export interface AbstractClass<Instance = any> extends Function {
  prototype: Instance;
}

export type ClassType<Instance = any> = AbstractClass<Instance> | Constructor<Instance>;


