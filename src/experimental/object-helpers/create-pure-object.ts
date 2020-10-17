
export function CreatePureObject<GObject>(obj: GObject): GObject {
  return Object.assign(Object.create(null), obj);
}
