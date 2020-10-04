import { TraitArrayLike } from './trait-array-like';


export abstract class TraitArrayJoin<GValue> extends TraitArrayLike<GValue> {
  join(separator: string = ''): string {
    let str: string = '';
    for (let i: number = 0, l = this.length(); i < l; i++) {
      if (i > 0) {
        str += separator;
      }
      str += String(this.item(i));
    }
    return str;
  }
}

// import { TraitToString } from '../others/trait-to-string';
// export abstract class TraitArrayJoin<GValue extends TraitToString> extends TraitArrayLike<GValue> {
//   join(separator: string = ''): string {
//     let str: string = '';
//     for (let i = 0, l = this.length(); i < l; i++) {
//       if (i > 0) {
//         str += separator;
//       }
//       str += this.item(i).toString();
//     }
//     return str;
//   }
// }
