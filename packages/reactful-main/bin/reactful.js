#! /usr/bin/env node
const path = require('path');
const fs = require('fs');

const config = {};

async function reactfulCreate() {
  try {
    const {appName, appPath} = config;
    console.info(`\n***** Creating ${appName} app *****\n`);

    require('../lib/copy')(config);

    await require('../lib/init')(config);

    console.info(`\n***** Done creating ${appName} app *****`);

    console.info(`
Usage:
    ${appPath === appName ? `\n    cd ${appName}\n` : ''}
    ### To start the app:
    reactful start

    ### Open the app in browser:
    reactful open

    ### To run tests:
    reactful test

For problems and questions: https://slack.jscomplete.com/
    `);
  } catch (err) {
    console.error(err);
  }
}

async function forwardCommand(...args) {
  try {
    await require('../lib/forward')(...args);
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  const commandExists = require('../lib/commandExists');
  config.useYarn = await commandExists('yarn');
  config.useGit = await commandExists('git');
  config.appType = 'simple';

  const [firstArg, secondArg] = process.argv.slice(2);

  if (firstArg === 'jt') {
    console.info(`Testing - ${new Date()}`);
    return;
  }

  if (firstArg === 'init') {
    config.appPath = '.';
    config.appName = path.basename(path.resolve('.'));
  }

  if (firstArg === 'new') {
    config.appPath = config.appName = secondArg;
  }

  if (!['init', 'new'].includes(firstArg)) {
    if (fs.existsSync(path.resolve('src', 'server', 'config.js'))) {
      return forwardCommand(firstArg, secondArg);
    }

    config.appPath = config.appName = firstArg;
  }

  reactfulCreate();
}

main();
