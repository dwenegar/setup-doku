import * as core from '@actions/core';
import {getInput} from '@actions/core';
import {InputNames} from './constants';
import {Inputs} from './inputs';

const VALID_DOKU_VERSIONS: string[] = ['1.1.0'];
const DOKU_VERSION_ALIASES: {[index: string]: string} = {
  latest: '1.1.0'
};

const VALID_DOCFX_VERSIONS: string[] = ['2.67.2'];
const DOCFX_VERSION_ALIASES: {[index: string]: string} = {
  latest: '2.67.2'
};

export function getInputs(): Inputs {
  const dokuVersion = getInput(InputNames.DokuVersion, {required: true});
  const docFxVersion = getInput(InputNames.DocFxVersion, {required: true});
  const repoToken = getInput(InputNames.RepoToken, {required: false});

  let resolvedDokuVersion = dokuVersion;
  if (DOKU_VERSION_ALIASES[dokuVersion]) {
    resolvedDokuVersion = DOKU_VERSION_ALIASES[dokuVersion];
  }

  if (!VALID_DOKU_VERSIONS.includes(resolvedDokuVersion)) {
    core.setFailed(`Invalid doku version: ${dokuVersion}`);
  }

  let resolvedDocFxVersion = docFxVersion;
  if (DOCFX_VERSION_ALIASES[docFxVersion]) {
    resolvedDocFxVersion = DOCFX_VERSION_ALIASES[docFxVersion];
  }

  if (!VALID_DOCFX_VERSIONS.includes(resolvedDocFxVersion)) {
    core.setFailed(`Invalid DocFx version: ${docFxVersion}`);
  }

  return {
    docFxVersion: resolvedDocFxVersion,
    dokuVersion: resolvedDokuVersion,
    repoToken: repoToken
  };
}
