import { Trait } from './functions';
import { TraitToString } from './build-in/others/trait-to-string/trait-to-string';


/** TO STRING **/


// https://doc.rust-lang.org/src/core/fmt/mod.rs.html#648-672

/*
pub trait Display {
  #[stable(feature = "rust1", since = "1.0.0")]
  fn fmt(&self, f: &mut Formatter<'_>) -> Result;
}
 */

// @Trait()
// export abstract class TraitDisplay<GSelf> extends TraitToString<GSelf> {
//   abstract fmt(this: GSelf): void;
// }



/** PRINT **/

/*
trait OutlinePrint: fmt::Display {
    fn outline_print(&self) {
        let output = self.to_string();
        let len = output.len();
        println!("{}", "*".repeat(len + 4));
        println!("*{}*", " ".repeat(len + 2));
        println!("* {} *", output);
        println!("*{}*", " ".repeat(len + 2));
        println!("{}", "*".repeat(len + 4));
    }
}
*/

@Trait()
export abstract class TraitOutlinePrint<GSelf extends TraitToString<GSelf>> {
  outlinePrint(this: GSelf): void {
    const output = this.toString();
    const len = output.length;
    const lines = [
      '*'.repeat(len + 4),
      // `*${' '.repeat(len + 2)}*`,
      `* ${output} *`,
      // `*${' '.repeat(len + 2)}*`,
      '*'.repeat(len + 4),
    ]
    console.log(lines.join('\n'));
  }
}

