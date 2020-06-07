import path from 'path';
import fs from 'fs';
import { spawnSync } from 'child_process';

const scripts = {
  default: ({ pmCommand, appName }) => ({
    'eslint': 'eslint "src/**/*.js"',
    'start': `concurrently "${pmCommand} run dev:server" "${pmCommand} run dev:bundler"`,

    'dev:server':
      'cross-env NODE_PATH=./src nodemon --exec "babel-node src/server/server.js" --ignore .reactful.json --ignore public/',
    'dev:bundler': 'webpack -wd',

    'build:react': 'cross-env NODE_ENV=production webpack --progress -p',
    'build:node':
      'babel src -d build --config-file ./babel-node.config.js --copy-files',
    'build:all': `${pmCommand} install && ${pmCommand} run build:react && ${pmCommand} run build:node`,

    'prod:start': `cross-env NODE_ENV=production NODE_PATH=./build pm2 start -i max build/server/server.js --update-env --name ${appName}Prod`,
    'prod:stop': `pm2 stop ${appName}Prod`,
    'prod:reload': `pm2 reload --update-env ${appName}Prod`,
    'prod:logs': `pm2 logs --update-env ${appName}Prod`,
  }),
  typescript: ({ pmCommand, appName }) => ({
    'eslint': 'eslint "src/**/*.{js,jsx,ts,tsx}"',
    'start': `concurrently "${pmCommand} run dev:server" "${pmCommand} run dev:bundler"`,
    'dev:server':
      'cross-env NODE_PATH=./src tsnd --respawn src/server/server.ts --ignore-watch node_modules,public',
    'dev:bundler': 'webpack -wd --env.dev',
    'build:webpack': 'cross-env NODE_ENV=production webpack -p --env.prod',
    'build:files':
      'copyfiles -u 1 -e "src/**/*.ts" -e "src/**/*.tsx" -e "src/**/*.js" "src/**/*" build/',
    'build:node': 'rm -rf build && tsc --sourceMap false --skipLibCheck true',
    'build:all': `${pmCommand} install && ${pmCommand} run build:node && ${pmCommand} run build:files && ${pmCommand} run build:webpack`,
    'prod:start': `cross-env NODE_ENV=production NODE_PATH=./build pm2 start -i max build/server/server.js --exp-backoff-restart-delay=150 --update-env --name ${appName}Prod`,
    'prod:stop': `pm2 stop ${appName}Prod`,
    'prod:reload': `pm2 reload --update-env ${appName}Prod && ${pmCommand} run prod:logs`,
    'prod:logs': `pm2 logs --update-env ${appName}Prod`,
  }),
  simple: () => ({
    eslint: 'eslint "src/**/*.{js,jsx,ts,tsx}"',
    start: '(cd src && parcel index.html)',
  }),
};

export async function init({
  appName,
  appPath,
  useYarn,
  useGit,
  useTests,
  template,
}: configType): Promise<void> {
  const pmCommand = useYarn ? 'yarn' : 'npm';
  const packageJson = {
    name: appName,
    version: '1.0.0',
    private: true,
    scripts: scripts[template]({ pmCommand, appName }),
    jest: {
      modulePaths: ['./src'],
      testPathIgnorePatterns: ['/node_modules/'],
      setupFilesAfterEnv: ['<rootDir>src/setupTests.js'],
    },
  };

  fs.writeFileSync(
    path.resolve(appPath, '.gitignore'),
    'node_modules/\npublic/bundles/\nbuild/\nsrc/dist/\ncoverage/\n.reactful.json\nyarn-error.log\n.env\n.vscode/\n.DS_Store\n',
  );

  if (useTests) {
    packageJson.scripts['test'] = 'jest';
    packageJson.scripts['verify-tests'] = 'jest --coverage';
  }

  fs.writeFileSync(
    path.resolve(appPath, 'package.json'),
    JSON.stringify(packageJson, null, 2),
  );

  if (['default', 'typescript'].includes(template)) {
    const reactfulJson = {
      main: ['main.css', 'main.js'],
      vendor: 'vendor.js',
    };

    fs.writeFileSync(
      path.resolve(appPath, '.reactful.json'),
      JSON.stringify(reactfulJson, null, 2),
    );
  }

  const { main: mainDeps, dev: devDeps } = await import(
    `../../templates/${template}`
  );

  if (useTests) {
    devDeps.push(
      'babel-jest',
      'jest',
      '@testing-library/react',
      '@testing-library/jest-dom',
      '@testing-library/user-event',
    );
  }

  const installProdCmd = useYarn ? 'yarn add' : 'npm install';
  const installDevCmd = useYarn ? 'yarn add --dev' : 'npm install --save-dev';

  const gitInit = useGit ? 'git init &&' : '';
  const gitCommit = useGit
    ? '&& git add . && git commit -m "reactful init"'
    : '';

  spawnSync(
    `${gitInit} ${installProdCmd} ${mainDeps.join(
      ' ',
    )} && ${installDevCmd} ${devDeps.join(' ')} ${gitCommit}`,
    {
      shell: true,
      stdio: 'inherit',
      cwd: path.resolve(appPath),
    },
  );
}
