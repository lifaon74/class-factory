export function IsCamelCase(input: string): boolean {
  return (/^[a-z][a-zA-Z]*$/g).test(input);
}


export function IsDashCase(input: string): boolean {
  return (/^[a-z](?:-?[a-z])*$/g).test(input);
}

export function IsPascalCase(input: string): boolean {
  return (/^[a-zA-Z]*$/g).test(input);
}

export function IsSnakeCase(input: string): boolean {
  return (/^[a-z](?:_?[a-z])*$/g).test(input);
}


export function DashCaseToPascalCase(input: string): string {
  return input.replace(/(^[a-z])|-([a-z])/g, (match: string, letter1: string, letter2: string) => ((letter1 === void 0) ? letter2 : letter1).toUpperCase());
}

export function DashCaseToCamelCase(input: string): string {
  return input.replace(/-([a-z])/g, (match: string, letter: string) => letter.toUpperCase());
}

export function DashCaseToSnakeCase(input: string): string {
  return input.replace(/-/g, '_');
}

export function DashCaseToUpperSnakeCase(input: string): string {
  return DashCaseToSnakeCase(input).toUpperCase();
}


