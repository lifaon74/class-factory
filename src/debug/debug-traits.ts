import { Method } from 'src/core/traits/method/class/method-class';



export async function debugTrait1() {
  const hello = new Method({
    propertyKey: 'hello',
    value: function(this: { value: number }) {
      console.log('hello', this.value);
    }
  });

  const obj = {
    value: 10
  };

  const b = hello.call(obj);

  // TODO missing methods and functions
}

export async function debugTrait() {
  await debugTrait1();

}
