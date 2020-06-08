// import path from 'path';
import { spawnSync } from 'child_process';

export async function runCommand({
  useYarn,
  script,
}: {
  useYarn: boolean;
  script: string;
}): Promise<void> {
  const pmCommand = useYarn ? 'yarn' : 'npm';

  spawnSync(`${pmCommand} run ${script}`, {
    shell: true,
    stdio: 'inherit',
    // cwd: path.resolve(appPath),
  });
}
