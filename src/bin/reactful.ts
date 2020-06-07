#! /usr/bin/env node
import path from 'path';
import { Command } from 'commander';
import {
  createApp,
  openApp,
  nameFromPath,
  generateComponent,
  generateTest,
  commandExists,
  runCommand,
} from '../commands';

const program = new Command();
program
  .version(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('../../package.json').version,
    '-v, --version',
    'display the version of the current reactful command',
  )
  .name('npx reactful')
  .helpOption('-h, --help', 'display help for the reactful command');

(async function main() {
  const yarnExists = commandExists('yarn');
  const gitExists = commandExists('git');

  let tsProject;

  try {
    require(path.resolve('tsconfig.json'));
    tsProject = true;
  } catch (err) {
    tsProject = false;
  }

  program
    .command('create <app-name>')
    .alias('')
    .alias('new')
    .description('creata a new reactful project')
    .option(
      '-t, --template <template_name>',
      'Template to use: default, typescript, simple',
    )
    .option('--no-tests', 'Do not include tests dependencies')
    .option('--no-git', 'Skip initializing the app as a git repo')
    .option('--use-npm', 'Use npm as the package manager for the project')
    .action(async (appPath, cmdObj = {}) => {
      await createApp({
        appPath: appPath,
        appName: nameFromPath(appPath),
        template: cmdObj.template || 'default',
        useGit: !cmdObj.git ? false : gitExists,
        useYarn: cmdObj.useNpm ? false : yarnExists,
        useTests: cmdObj.tests,
      });
    });

  program
    .command('init')
    .description('initialize current directory as a reactful project')
    .option(
      '-t, --template <template_name>',
      'Template to use: default, typescript, simple',
    )
    .option('--no-tests', 'Do not include tests dependencies')
    .option('--no-git', 'Skip initializing the app as a git repo')
    .option('--use-npm', 'Use npm as the package manager for the project')
    .action(async (cmdObj) => {
      await createApp({
        appPath: '.',
        appName: path.basename(path.resolve('.')),
        template: cmdObj.template || 'default',
        useGit: cmdObj.git ? false : gitExists,
        useYarn: cmdObj.useNpm ? false : yarnExists,
        useTests: !cmdObj.tests,
      });
    });

  program
    .command('gc <component-name>')
    .alias('')
    .alias('gfc')
    .description('generate a function component')
    .action((componentName) =>
      generateComponent('rfc', componentName, tsProject),
    );

  program
    .command('gcc <component-name>')
    .description('generate a class component')
    .action((componentName) =>
      generateComponent('rcc', componentName, tsProject),
    );

  program
    .command('gt <component-name>')
    .description('generate a test for existing component')
    .action((componentName) => generateTest(componentName, tsProject));

  program
    .command('open [port]', { hidden: true })
    .description('open browser for the development environment')
    .action((port = '1234') => openApp(`http://localhost:${port}`));

  program
    .command('run <script>', { isDefault: true })
    .description('run a script in the current directroy')
    .action((script) => runCommand({ useYarn: yarnExists, script }));

  await program.parseAsync();
})();
