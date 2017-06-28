const path = require('path');
const { copy, inspect } = require('fs-jetpack');
const prompt = require('prompt-sync')();

module.exports = function reactfulCopy({ appPath, appType }) {
  const templateDir = path.resolve(
    __dirname,
    '..',
    appType === 'simple' ? 'template' : 'template-full'
  );

  copy(templateDir, appPath, {
    overwrite: (src, dest) => {
      if (
        inspect(src.absolutePath, { checksum: 'md5' }).md5 !==
        inspect(dest.absolutePath, { checksum: 'md5' }).md5
      ) {
        const answer = prompt(`Replace ${src.name}? [y|n] `);
        return answer.match(/(yes|yep|y|sure)/, 'i');
      }
      return true;
    },
  });
};
