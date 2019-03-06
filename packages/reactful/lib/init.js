const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

module.exports = function reactfulInit(config) {
  return new Promise((resolve, reject) => {
    const pmCommand = config.useYarn ? 'yarn' : 'npm';
    const { appName, appPath } = config;
    const packageJson = {
      name: appName,
      version: '1.0.0',
      private: true,
      scripts: {
        eslint: 'eslint "src/**/*.js"',
        start: `concurrently "${pmCommand} run dev-server" "${pmCommand} run dev-bundle"`,
        test: 'jest',

        'dev-server':
          'cross-env NODE_PATH=./src nodemon --exec "babel-node src/server/server.js" --ignore .reactful.json --ignore public/',
        'dev-bundle': 'webpack -wd',
        'verify-tests': 'jest --coverage',

        'build-react': 'cross-env NODE_ENV=production webpack --progress -p',
        'build-node':
          'babel src -d build --config-file ./babel-node.config.js --copy-files',
        'build-all': `${pmCommand} install && ${pmCommand} run build-react && ${pmCommand} run build-node`,

        'prod-start': `cross-env NODE_ENV=production NODE_PATH=./build pm2 start -i max build/server/server.js --update-env --name ${appName}Prod`,
        'prod-stop': `pm2 stop ${appName}Prod`,
        'prod-reload': `pm2 reload --update-env ${appName}Prod`,
        'prod-logs': `pm2 logs --update-env ${appName}Prod`,
      },
      jest: {
        modulePaths: ['./src'],
        testPathIgnorePatterns: ['/node_modules/'],
        setupFilesAfterEnv: ['<rootDir>src/setupTests.js'],
      },
    };

    const reactfulJson = {
      main: ['main.css', 'main.js'],
      vendor: 'vendor.js',
    };

    fs.writeFileSync(
      path.resolve(appPath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    fs.writeFileSync(
      path.resolve(appPath, '.gitignore'),
      'node_modules/\npublic/bundles/\nbuild/\ncoverage/\n.reactful.json\n.env\n.vscode/\n'
    );

    fs.writeFileSync(
      path.resolve(appPath, '.reactful.json'),
      JSON.stringify(reactfulJson, null, 2)
    );

    const { main: mainDeps, dev: devDeps } = require('./dependencies');

    const installProdCmd = config.useYarn ? 'yarn add' : 'npm install';
    const installDevCmd = config.useYarn
      ? 'yarn add --dev'
      : 'npm install --save-dev';

    const gitInit = config.useGit ? 'git init &&' : '';
    const gitCommit = config.useGit
      ? '&& git add . && git commit -m "reactful init"'
      : '';

    const child = spawn(
      `${gitInit} ${installProdCmd} ${mainDeps.join(
        ' '
      )} && ${installDevCmd} ${devDeps.join(' ')} ${gitCommit}`,
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
