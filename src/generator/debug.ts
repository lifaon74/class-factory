import { GenerateClassPrivateContent } from './class-private-generator';
import { GenerateClassDefinitionsContent } from './class-definition-generator';

export async function debugClassGenerator() {

  // const lines: string[] = GenerateClassPrivateContent('readonly-array');
  const lines: string[] = GenerateClassDefinitionsContent('readonly-array', '<T extends string>', '<T>');

  console.log(lines.join('\n'));
}
