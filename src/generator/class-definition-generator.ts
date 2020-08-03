import { DashCaseToPascalCase } from './cases';
import { IndentLines, OptionalLines } from './lines';
import { TDashCaseString } from './class-generator';

/** DEFINITIONS */

export function GenerateClassName(
  name: TDashCaseString,
): string {
  return DashCaseToPascalCase(name);
}

export function GenerateClassStaticInterfaceName(
  name: TDashCaseString,
): string {
  return `${ GenerateClassInterfaceName(name) }Static`;
}

export function GenerateClassConstructorInterfaceName(
  name: TDashCaseString
): string {
  return `${ GenerateClassInterfaceName(name) }Constructor`;
}

export function GenerateClassTypedConstructorInterfaceName(
  name: TDashCaseString
): string {
  return `${ GenerateClassInterfaceName(name) }TypedConstructor`;
}

export function GenerateClassConstructorArgumentsTypeName(
  name: TDashCaseString
): string {
  return `${ GenerateClassConstructorInterfaceName(name) }Arguments`;
}

export function GenerateClassInterfaceName(
  name: TDashCaseString
): string {
  return `T${ GenerateClassName(name) }`;
}


export function GenerateClassConstructorArgumentsType(
  name: TDashCaseString,
  generics: string = '',
): string[] {
  return [
    `export type ${ GenerateClassConstructorArgumentsTypeName(name) }${ generics } = [];`,
  ];
}

export function GenerateClassStaticInterface(
  name: TDashCaseString
): string[] {
  return [
    `export interface ${ GenerateClassStaticInterfaceName(name) } {`,
    `}`,
  ];
}

export function GenerateClassConstructorInterface(
  name: TDashCaseString,
  generics: string = '',
  genericsForChildren: string = '',
): string[] {
  return [
    `export interface ${ GenerateClassConstructorInterfaceName(name) } extends ${ GenerateClassStaticInterfaceName(name) } {`,
    ...IndentLines([
      `new${ generics }(...args: ${ GenerateClassConstructorArgumentsTypeName(name) }${ genericsForChildren }): ${ GenerateClassInterfaceName(name) }${ genericsForChildren };`,
    ]),
    `}`,
  ];
}

export function GenerateClassTypedConstructorInterface(
  name: TDashCaseString,
  generics: string = '',
  genericsForChildren: string = '',
): string[] {
  return [
    `export interface ${ GenerateClassTypedConstructorInterfaceName(name) }${ generics } extends ${ GenerateClassStaticInterfaceName(name) } {`,
    ...IndentLines([
      `new(...args: ${ GenerateClassConstructorArgumentsTypeName(name) }${ genericsForChildren }): ${ GenerateClassInterfaceName(name) }${ genericsForChildren };`,
    ]),
    `}`,
  ];
}

export function GenerateClassInterface(
  name: TDashCaseString,
  generics: string = '',
): string[] {
  return [
    `export interface ${ GenerateClassInterfaceName(name) }${ generics } {`,
    ``,
    `}`,
  ];
}


// export interface IComponentTypedConstructor<TData extends object> {
//   new(): IComponent<TData>;
// }
//
// export interface IComponent<TData extends object> extends HTMLElement, Partial<OnCreate<TData>>, Partial<OnInit>, Partial<OnDestroy>, Partial<OnConnected>, Partial<OnDisconnected> {
// }


export function GenerateClassDefinitionsContent(
  name: TDashCaseString,
  generics?: string,
  genericsForChildren?: string,
): string[] {
  return [
    `/** DEFINITIONS **/`,
    ``,
    `/* CONSTRUCTOR */`,
    ``,
    ...GenerateClassStaticInterface(name),
    ``,
    ...GenerateClassConstructorArgumentsType(name, generics),
    ``,
    ...GenerateClassConstructorInterface(name, generics, genericsForChildren),
    ``,
    ...OptionalLines(generics, (generics: string) => [
      ...GenerateClassTypedConstructorInterface(name, generics, genericsForChildren),
      ``,
    ]),
    `/* INSTANCE */`,
    ``,
    ...GenerateClassInterface(name, generics),
  ];
}
