import { DashCaseToUpperSnakeCase } from './cases';
import { IndentLines } from './lines';
import { TDashCaseString } from './class-generator';
import { GenerateClassInterfaceName } from './class-definition-generator';

/** PRIVATE */

export function GeneratePrivateSymbolName(
  name: TDashCaseString
): string {
  return `${ DashCaseToUpperSnakeCase(name) }_PRIVATE`;
}

export function GeneratePrivatePropertiesInterfaceName(
  name: TDashCaseString
): string {
  return `${ GenerateClassInterfaceName(name) }PrivateProperties`;
}

export function GenerateClassWithPrivatePropertiesInterfaceName(
  name: TDashCaseString
): string {
  return `${ GenerateClassInterfaceName(name) }WithPrivateProperties`;
}

export function GenerateClassInternalInterfaceName(
  name: TDashCaseString
): string {
  return `${ GenerateClassInterfaceName(name) }Internal`;
}


export function GeneratePrivateSymbol(
  name: TDashCaseString
): string[] {
  return [
    `export const ${ GeneratePrivateSymbolName(name) } = Symbol('${ name }-private')`,
  ];
}

export function GeneratePrivateInterface(
  name: TDashCaseString
): string[] {
  return [
    `export interface ${ GeneratePrivatePropertiesInterfaceName(name) } {`,
    ``,
    `}`,
  ];
}

export function GenerateClassWithPrivateSymbolInterface(
  name: TDashCaseString
): string[] {
  return [
    `export interface ${ GenerateClassWithPrivatePropertiesInterfaceName(name) } {`,
    ...IndentLines([
      `[${ GeneratePrivateSymbolName(name) }]: ${ GeneratePrivatePropertiesInterfaceName(name) };`,
    ]),
    `}`,
  ];
}

export function GenerateInternalInterface(
  name: TDashCaseString
): string[] {
  return [
    `export interface ${ GenerateClassInternalInterfaceName(name) } extends ${ GenerateClassWithPrivatePropertiesInterfaceName(name) }, ${ GenerateClassInterfaceName(name) } {`,
    `}`,
  ];
}

export function GenerateClassPrivateContent(
  name: TDashCaseString
): string[] {
  return [
    `/** PRIVATE **/`,
    ``,
    ...GeneratePrivateSymbol(name),
    ``,
    ...GeneratePrivateInterface(name),
    ``,
    ...GenerateClassWithPrivateSymbolInterface(name),
    ``,
    ...GenerateInternalInterface(name),
  ];
}
