const path = require('path');
const fs = require('fs');
const text = require('./text');

module.exports = function createComponent(componentType, componentName) {
  const componentCode = text[componentType];
  const jestCode = text.jest[componentType] || text.jest.default;

  return new Promise((resolve, reject) => {
    try {
      const componentFile = path.resolve(
        'src',
        'components',
        `${componentName}.js`
      );
      console.info(`Generating ${path.relative('.', componentFile)}`);
      fs.writeFileSync(componentFile, componentCode(componentName));

      const componentTestFile = path.resolve(
        'src',
        'components',
        `${componentName}.test.js`
      );
      console.info(`Generating ${path.relative('.', componentTestFile)}`);
      fs.writeFileSync(componentTestFile, jestCode(componentName));

      console.info('✨✨✨ Done.');
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
