const path = require('path');
const fs = require('fs');
const {spawn} = require('child_process');

module.exports = function reactfulInit(config) {
  return new Promise((resolve, reject) => {
    const pmCommand = config.useYarn ? 'yarn' : 'npm';
    const {appName, appPath} = config;
    const packageJson = {
      name: appName,
      version: '1.0.0',
      private: true,
      scripts: {
        eslint: 'eslint "src/**/*.js"',
        format: 'prettier-eslint "src/**/*.js" "src/**/*.scss" --write',
        dev:
          'cross-env NODE_PATH=./src nodemon --exec "babel-node src/server/server.js" --ignore .reactful.json --ignore public/',
        webpack: 'webpack -wd',
        start: `concurrently "${pmCommand} run webpack" "${pmCommand} run dev"`,
        test: 'jest',
        'verify-tests': 'jest --coverage',
        'build-react': 'cross-env NODE_ENV=production webpack --progress -p',
        'build-node':
          'babel src -d build --config-file ./.babelrc.node --copy-files',
        build: `${pmCommand} install && ${pmCommand} run build-react && ${pmCommand} run build-node`,
        'prod-start': `cross-env NODE_ENV=production NODE_PATH=./build pm2 start -i max build/server/server.js --update-env --name ${appName}Prod`,
        'prod-stop': `pm2 stop ${appName}Prod`,
        'prod-reload': `pm2 reload --update-env ${appName}Prod`,
        'prod-logs': `pm2 logs --update-env ${appName}Prod`,
        _reactful_commands: '_reactful_commands',
      },
      jest: {
        modulePaths: ['./src'],
        testPathIgnorePatterns: ['/node_modules/'],
      },
    };

    const reactfulJson = {
      main: ['main.css', 'main.js'],
      vendor: 'vendor.js',
    };

    // TODO: Use promise.all for file writes
    fs.writeFileSync(
      path.resolve(appPath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    fs.writeFileSync(
      path.resolve(appPath, '.gitignore'),
      'node_modules/\npublic/bundles/\nbuild/\ncoverage/\n.reactful.json\n.env\n.vscode/'
    );

    // TODO: fix race condition
    fs.writeFileSync(
      path.resolve(appPath, '.reactful.json'),
      JSON.stringify(reactfulJson, null, 2)
    );

    const {main: mainDeps, dev: devDeps} = require('./dependencies');

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
