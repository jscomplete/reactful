#! /usr/bin/env node
const path = require('path');
const fs = require('fs');

const config = {};

async function reactfulCreate() {
  try {
    const { appName, appPath, useYarn } = config;
    console.info(`⚡ CREATING: ${appName}`);

    require('../lib/copy')(config);

    await require('../lib/init')(config);

    console.info('⚡ DONE');

    const pmCommand = useYarn ? 'yarn' : 'npm';

    console.info(`
⚡ Usage:
    ${appPath === appName ? `\n    cd ${appName}\n` : ''}
    ### To start the app:
    ${pmCommand} start

    ### Open the app in browser:
    npx reactful open

    ### To run tests:
    ${pmCommand} test

For problems and questions: https://jscomplete.com/help
    `);
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  const commandExists = require('../lib/commandExists');
  const runCommand = require('../lib/commands');
  config.useYarn = await commandExists('yarn');
  config.useGit = await commandExists('git');
  config.appType = 'simple';

  const [firstArg, ...otherArgs] = process.argv.slice(2);

  if (firstArg === 'init') {
    config.appPath = '.';
    config.appName = path.basename(path.resolve('.'));
  }

  if (firstArg === 'new') {
    config.appPath = otherArgs[0];
    config.appName = otherArgs[0]
      .replace(/\/$/, '')
      .split('/')
      .slice(-1)[0];
  }

  if (!['init', 'new'].includes(firstArg)) {
    if (fs.existsSync(path.resolve('src', 'server', 'config.js'))) {
      return runCommand(firstArg, otherArgs);
    }

    config.appPath = firstArg;
    config.appName = firstArg
      .replace(/\/$/, '')
      .split('/')
      .slice(-1)[0];
  }

  reactfulCreate();
}

main();
