export interface ITraitFunctionStruct<GPropertyKey extends PropertyKey> {
  readonly propertyKey: GPropertyKey;
  readonly enumerable: boolean;
  readonly configurable: boolean;
  readonly writable: boolean;
}
