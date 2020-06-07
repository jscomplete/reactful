import { copy, init } from './index';

export async function createApp({
  appName,
  appPath,
  useYarn,
  useGit,
  useTests,
  template,
}: configType): Promise<void> {
  console.info(`⚡ CREATING: ${appName}`);

  copy({ appPath, template });

  await init({ appName, appPath, useYarn, useGit, useTests, template });

  console.info('⚡ DONE');

  console.info(`⚡ Usage:
    ${appPath === appName ? `\n    cd ${appName}\n` : ''}
    ### Start the app:
    npx reactful start

    ### Open browser on default dev port:
    npx reactful open

    ### Run all tests:
    npx reactful test

For questions: https://jscomplete.com/help`);
}
