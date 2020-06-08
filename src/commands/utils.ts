import path from 'path';
import { spawnSync } from 'child_process';
import { copy as fsCopy, inspect as fsInspect } from 'fs-jetpack';
import promptSync from 'prompt-sync';

export function nameFromPath(path: string): string {
  return path.replace(/\/$/, '').split('/').slice(-1)[0];
}

const isWin = process.platform === 'win32';

const openCommand = isWin ? 'start' : 'open';
export function openApp(url: string): void {
  spawnSync(`${openCommand} ${url}`, {
    shell: true,
    stdio: 'inherit',
  });
}

const where = isWin ? 'where' : 'which';
export function commandExists(command: string): boolean {
  const { status } = spawnSync(where + ' ' + command, {
    shell: true,
  });

  return status === 0;
}

const prompt = promptSync();

export function copy({
  appPath,
  template,
}: {
  appPath: string;
  template: string;
}): void {
  const templateDir = path.resolve(
    __dirname,
    '..',
    '..',
    'templates',
    template,
  );

  fsCopy(templateDir, appPath, {
    overwrite: (src, dest) => {
      if (
        fsInspect(src.absolutePath, { checksum: 'md5' }).md5 !==
        fsInspect(dest.absolutePath, { checksum: 'md5' }).md5
      ) {
        const answer = prompt(`Replace ${src.name}? [y|n] `);
        return answer.match(/(yes|yep|y|sure)/, 'i');
      }
      return true;
    },
  });
}
