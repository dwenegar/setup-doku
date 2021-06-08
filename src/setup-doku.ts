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

    const docFxVersion = inputs.docFxVersion;
    core.info(`Setup DocFx version ${docFxVersion}`);
    const docFxPath = await installDocFx(inputs.repoToken, docFxVersion, installPrefix);
    addPath(docFxPath);
  } catch (error) {
    core.setFailed(error.message);
  }
}
