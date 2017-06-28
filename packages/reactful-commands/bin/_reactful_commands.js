#! /usr/bin/env node
const path = require('path');

const command = process.argv[2];
const args = process.argv.slice(3);

async function openApp() {
  try {
    const { host, port } = require(path.resolve('.reactful.json'));
    await require('../lib/open-url')(`http://${host}:${port}`);
  } catch (err) {
    console.error(err);
  }
}

async function runCommand(command) {
  try {
    await require('../lib/run-command')(command);
  } catch (err) {
    console.error(err);
  }
}

async function createComponent(componentType, ...args) {
  try {
    await require('../lib/create-component')(componentType, ...args);
  } catch (err) {
    console.error(err);
  }
}

switch (command) {
  case 'open':
    openApp();
    break;
  case 'start':
  case 'test':
  case 'build':
  case 'prod':
    runCommand(command);
    break;
  case 'pc':
  case 'pure-component':
    createComponent('pure', ...args);
    break;
  case 'c':
  case 'component':
    createComponent('full', ...args);
    break;
  case 'fc':
  case 'function-component':
    createComponent('function', ...args);
    break;
  default:
    console.error('Unsupported Command');
}
