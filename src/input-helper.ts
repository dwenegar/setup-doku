import * as core from '@actions/core';
import {getInput} from '@actions/core';
import {InputNames} from './constants';
import {Inputs} from './inputs';

const VALID_DOKU_VERSIONS: string[] = ['0.3.1'];

const DOKU_VERSION_ALIASES: {[index: string]: string} = {
  '0.3': '0.3.1',
  latest: '0.3.1'
};

const VALID_DOCFX_VERSIONS: string[] = ['2.57.2'];

const LUAROCKS_VERSION_ALIASES: {[index: string]: string} = {
  '2.57': '2.57.2',
  latest: '2.57.2'
};

export function getInputs(): Inputs {
  const dokuVersion = getInput(InputNames.DokuVersion, {required: true});
  const docfxVersion = getInput(InputNames.DocFxVersion, {required: true});
  const repoToken = getInput(InputNames.RepoToken, {required: false});

  let resolvedDokuVersion = dokuVersion;
  if (DOKU_VERSION_ALIASES[dokuVersion]) {
    resolvedDokuVersion = DOKU_VERSION_ALIASES[dokuVersion];
  }

  if (!VALID_DOKU_VERSIONS.includes(resolvedDokuVersion)) {
    core.setFailed(`Invalid doku version: ${dokuVersion}`);
  }

  let resolvedDocFxVersion = docfxVersion;
  if (docfxVersion) {
    if (LUAROCKS_VERSION_ALIASES[docfxVersion]) {
      resolvedDocFxVersion = LUAROCKS_VERSION_ALIASES[docfxVersion];
    }

    if (!VALID_DOCFX_VERSIONS.includes(resolvedDocFxVersion)) {
      core.setFailed(`Invalid docfx version: ${docfxVersion}`);
    }
  }

  return {
    dokuVersion: resolvedDokuVersion,
    docFxVersion: resolvedDocFxVersion,
    repoToken: repoToken
  };
}
