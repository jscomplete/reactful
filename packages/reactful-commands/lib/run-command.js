const { spawn } = require('child_process');

module.exports = function runCommand(command) {
  return new Promise((resolve, reject) => {
    const child = spawn(`npm run ${command}`, {
      shell: true,
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('exit', resolve);
  });
};
