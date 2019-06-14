const path = require('path');

async function openApp() {
  try {
    const { host, port } = require(path.resolve('.reactful.json'));
    await require('./open-url')(`http://${host}:${port}`);
  } catch (err) {
    console.error(err);
  }
}

async function createComponent(componentType, args) {
  try {
    await require('./create-component')(componentType, ...args);
  } catch (err) {
    console.error(err);
  }
}

function printHelp() {
  console.info(`
⚡ Usage:

  ### Open the app in browser:
  npx reactful open

  ### Create a React (function component)
  npx reactful c MyComponent

  ### Create a class React
  npx reactful cc MyComponent

For problems and questions: https://jscomplete.com/help
  `);
}

module.exports = (command, args) => {
  switch (command) {
    case 'help':
    case '-h':
    case '--help':
      printHelp();
      break;
    case 'open':
      openApp();
      break;
    case 'c':
    case 'fc':
    case 'component':
      createComponent('rfc', args);
      break;
    case 'cc':
    case 'class-component':
      createComponent('rcc', args);
      break;
    case 'pc':
    case 'pure-component':
      createComponent('rpc', args);
      break;
    default:
      console.error('Unsupported Command');
  }
};
