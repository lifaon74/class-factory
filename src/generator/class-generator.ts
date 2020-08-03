import { DashCaseToCamelCase, DashCaseToPascalCase, DashCaseToUpperSnakeCase } from './cases';
import { IndentLines } from './lines';
import { promises as $fs } from 'fs';

export type TDashCaseString = string;


/** CLASS */





// export function generateClassPrivatesContent(
//   dashCaseClassName,
// ) {
//   const upperSnakeCase = DashCaseToSnakeCase(dashCaseClassName).toUpperCase();
//   const camelCase = DashCaseToCamelCase(dashCaseClassName);
//   return `
// export const ${ upperSnakeCase }_PRIVATE = Symbol('${ dashCaseClassName }-private');
//
// export interface T${ camelCase }Private<T> {
//
// }
//
// export interface IObserverPrivatesInternal<T> {
//   [OBSERVER_PRIVATE]: IObserverPrivate<T>;
// }
//
// export interface IObserverInternal<T> extends IObserverPrivatesInternal<T>, TObserver<T> {
// }
// `
// }
//
//
// async function generateClass(
//   dashCaseClassName, /* dash case */
// ) {
//   if (!IsDashCase(dashCaseClassName)) {
//     throw new Error(`Class name must be dash case`);
//   }
//   await $fs.writeFile(generateClassPrivatesContent(dashCaseClassName))
// }


