const isWin = process.platform === 'win32';
const where = isWin ? 'where' : 'which';
const { spawn } = require('child_process');

module.exports = function commandExists(command) {
  return new Promise((resolve, reject) => {
    const child = spawn(where + ' ' + command, {
      shell: true,
    });

    child.on('close', function childClose(code) {
      resolve(code === 0);
    });

    child.on('error', function childError(err) {
      reject(err);
    });
  });
};
