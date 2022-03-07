import * as core from '@actions/core';
import {join} from 'path';
import {getInputs} from './input-helper';
import {installDoku, installDocFx} from './installer';

function addPath(value: string) {
  core.addPath(value);
  core.info(`Added ${value} to PATH`);
}

export async function setupDoku() {
  try {
    const inputs = getInputs();

    const installPrefix = join(process.cwd(), '.install');

    const dokuVersion = inputs.dokuVersion;
    core.info(`Setup Doku version ${dokuVersion}`);

    const dokuPath = await installDoku(inputs.repoToken, dokuVersion, installPrefix);
    addPath(dokuPath);

    core.info(`Setup DocFx`);
    const docFxPath = await installDocFx(inputs.repoToken, installPrefix);
    addPath(docFxPath);
  } catch (e) {
    if (typeof e === 'string') {
      core.setFailed(e);
    } else if (e instanceof Error) {
      core.setFailed(e.message);
    }
  }
}
