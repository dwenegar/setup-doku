import * as core from '@actions/core';
import {getInput} from '@actions/core';
import {InputNames} from './constants';
import {Inputs} from './inputs';

const VALID_DOKU_VERSIONS: string[] = ['0.3.1', '0.3.2', '0.3.3', '0.3.4', '0.3.5', '0.5.2'];

const DOKU_VERSION_ALIASES: {[index: string]: string} = {
  latest: '0.5.2'
};

export function getInputs(): Inputs {
  const dokuVersion = getInput(InputNames.DokuVersion, {required: true});
  const repoToken = getInput(InputNames.RepoToken, {required: false});

  let resolvedDokuVersion = dokuVersion;
  if (DOKU_VERSION_ALIASES[dokuVersion]) {
    resolvedDokuVersion = DOKU_VERSION_ALIASES[dokuVersion];
  }

  if (!VALID_DOKU_VERSIONS.includes(resolvedDokuVersion)) {
    core.setFailed(`Invalid doku version: ${dokuVersion}`);
  }

  return {
    dokuVersion: resolvedDokuVersion,
    repoToken: repoToken
  };
}
