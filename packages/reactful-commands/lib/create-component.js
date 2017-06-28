const path = require('path');
const fs = require('fs');
const { rcc, rfc, jestSnap } = require('../lib/text');

module.exports = function createComponent(componentType, componentName) {
  const componentCode =
    componentType === 'function'
      ? rfc(componentName)
      : rcc(componentName, componentType === 'pure');

  return new Promise((resolve, reject) => {
    try {
      const componentFile = path.resolve(
        'src',
        'components',
        `${componentName}.js`
      );
      console.info(`Generating ${path.relative('.', componentFile)}`);
      fs.writeFileSync(componentFile, componentCode);

      const componentTestFile = path.resolve(
        'src',
        'components',
        '__tests__',
        `${componentName}Test.js`
      );
      console.info(`Generating ${path.relative('.', componentTestFile)}`);
      fs.writeFileSync(componentTestFile, jestSnap(componentName));

      console.info('✨  Done.');
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
