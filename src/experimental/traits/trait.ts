// import { debugVector2 } from '../debug/vector2';
// import { debugTraitRustLike } from '../debug/rust-like/traits-rust-like';
import { debugFunctionTraits } from '../debug/function-like/function-traits';


// export async function debugTrait1() {
//   class NotATrait {
//     methodA() {
//       console.log('hello');
//     }
//   }
//
//   class MyTrait extends Trait {
//     methodA() {
//       console.log('hello');
//     }
//   }
//
//
//   // const a: (NotATrait extends Trait ? true : false) = false;
//   // const b: (MyTrait extends Trait ? true : false) = true;
//
//   // const map = GetTraitMethods(NotATrait as any); // => should fail
//   const map = GetTraitMethods(MyTrait);
//   console.log(map);
//
//   ReflectTraitToStringOnNativeObjects();
//   console.log(traitIsImplementedBy(TraitToString, 1));
//   console.log(traitIsImplementedBy(TraitToString, {}));
//   console.log(traitIsImplementedBy(TraitToString, Object.create(null)));
// }
//
//
// export async function debugReadonlyArrayTrait() {
//
//
//   const a = new ReadonlyArray<number>([0, 1, 2, 3, 4]);
//
//   (window as any).a = a;
//   console.log(a);
//   // console.log(a.length());
// }


export async function debugTrait() {
  // await debugTrait1();
  // await debugVector2();
  // await debugTraitRustLike();
  await debugFunctionTraits();
  // await debugReadonlyArrayTrait();
  // await debugIteratorTrait();
}
