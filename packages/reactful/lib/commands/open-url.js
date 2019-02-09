const { spawn } = require('child_process');
const isWin = process.platform === 'win32';

const command = isWin ? 'start' : 'open';

module.exports = function openUrl(url) {
  return new Promise((resolve, reject) => {
    const child = spawn(`${command} ${url}`, {
      shell: true,
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('exit', resolve);
  });
};
