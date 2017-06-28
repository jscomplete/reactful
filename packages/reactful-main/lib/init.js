const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const isWin = process.platform === 'win32';

module.exports = function reactfulInit(config) {
  return new Promise((resolve, reject) => {
    const pmCommand = config.useYarn ? 'yarn' : 'npm';
    const { appName, appPath } = config;
    const packageJson = {
      name: appName,
      version: '0.1.0',
      private: true,
      license: 'BSD-3-Clause',
      scripts: {
        format: 'prettier-eslint "src/**/*.js" --write --trailing-comma es5',
        nodemon: isWin
          ? 'cmd /c "set NODE_PATH=./src&& nodemon --exec babel-node src/server/server.js"'
          : 'NODE_PATH=./src nodemon --exec babel-node src/server/server.js',
        webpack: 'webpack -wd',
        start: `concurrently "${pmCommand} run webpack -s" "${pmCommand} run nodemon -s"`,
        test: 'jest --watch',
        'verify-tests': 'jest --coverage',
        'build-react': isWin
          ? 'cmd /c "set NODE_ENV=production&& webpack --progress -p"'
          : 'NODE_ENV=production webpack --progress -p',
        'build-node': 'babel src -d build --copy-files',
        build: `${pmCommand} install && ${pmCommand} run build-react && ${pmCommand} run build-node`,
        stop: `pm2 stop ${appName}Prod`,
        prod: isWin
          ? `cmd /c "set NODE_ENV=production&& set NODE_PATH=./build&& pm2 start -i max build/server/server.js --update-env --name ${appName}Prod"`
          : `NODE_ENV=production NODE_PATH=./build pm2 start -i max build/server/server.js --update-env --name ${appName}Prod`,
        reload: `pm2 reload --update-env ${appName}Prod`,
        logs: `pm2 logs ${appName}Prod`,
        _reactful_commands: '_reactful_commands',
        precommit: 'lint-staged',
        prepush: 'verify-tests',
      },
      babel: {
        presets: [
          'react',
          ['env', { targets: { node: 'current' } }],
          'stage-2',
        ],
      },
      jest: {
        modulePaths: ['./src'],
      },
      'lint-staged': {
        '*.js': ['format', 'git add'],
      },
    };

    fs.writeFileSync(
      path.resolve(appPath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    fs.writeFileSync(
      path.resolve(appPath, '.gitignore'),
      'node_modules/\npublic/bundles/\nbuild/\ncoverage/\n.reactful.json'
    );

    fs.writeFileSync(path.resolve(appPath, '.reactful.json'), '{}');

    const {
      main: mainDeps,
      dev: devDeps,
      full: fullDeps,
    } = require('./dependencies');

    if (config.appType === 'full') {
      mainDeps.push(...fullDeps);
    }

    const installProdCmd = config.useYarn ? 'yarn add' : 'npm install --save';
    const installDevCmd = config.useYarn
      ? 'yarn add --dev'
      : 'npm install --save';

    const gitInit = config.useGit ? 'git init &&' : '';

    const child = spawn(
      `${gitInit} ${installProdCmd} ${mainDeps.join(
        ' '
      )} && ${installDevCmd} ${devDeps.join(' ')}`,
      {
        shell: true,
        stdio: 'inherit',
        cwd: path.resolve(appPath),
      }
    );

    child.on('error', reject);
    child.on('exit', resolve);
  });
};
