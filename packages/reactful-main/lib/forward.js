const { spawn } = require('child_process');

module.exports = function forwardCommand(...args) {
  return new Promise((resolve, reject) => {
    const child = spawn(`npm run _reactful_commands ${args.join(' ')}`, {
      shell: true,
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('exit', resolve);
  });
};
