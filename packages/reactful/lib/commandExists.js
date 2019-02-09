const isWin = process.platform === 'win32';
const where = isWin ? 'where' : 'which';
const { spawn } = require('child_process');

module.exports = function commandExists(command) {
  return new Promise((resolve, reject) => {
    const child = spawn(where + ' ' + command, {
      shell: true,
    });

    child.on('close', code => {
      resolve(code === 0);
    });

    child.on('error', err => {
      reject(err);
    });
  });
};
