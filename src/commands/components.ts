import fs from 'fs';
import path from 'path';
import * as text from './text';

export async function generateTest(
  componentName: string,
  tsProject = false,
): Promise<void> {
  const jestCode = text.rtest(componentName);
  const componentTestFile = path.resolve(
    'src',
    'components',
    `${componentName}.test.${tsProject ? 'tsx' : 'js'}`,
  );
  console.info(`⚡ Generating ${path.relative('.', componentTestFile)}`);
  fs.writeFileSync(componentTestFile, jestCode);

  console.info('⚡ Done.');
}

export async function generateComponent(
  componentType: string,
  componentName: string,
  tsProject = false,
): Promise<void> {
  const componentCode = text[componentType](componentName);

  const componentFile = path.resolve(
    'src',
    'components',
    `${componentName}.${tsProject ? 'tsx' : 'js'}`,
  );
  console.info(`⚡ Generating ${path.relative('.', componentFile)}`);
  fs.writeFileSync(componentFile, componentCode);

  generateTest(componentName, tsProject);
}
