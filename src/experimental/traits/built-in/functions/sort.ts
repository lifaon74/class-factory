import { TraitCompare } from '../comparision/trait-compare';


export function sort<GItem extends TraitCompare<GItem>>(
  array: GItem[],
): GItem[] {
  return array.sort((a: GItem, b: GItem) => {
    return a.compare(b);
  });
}
