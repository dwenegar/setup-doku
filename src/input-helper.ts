import * as core from '@actions/core';
import * as semver from 'semver';
import {getInput} from '@actions/core';
import {InputNames} from './constants';
import {Inputs} from './inputs';

export function getInputs(): Inputs {
  const dokuVersion = getInput(InputNames.DokuVersion, {required: true});
  const docFxVersion = getInput(InputNames.DocFxVersion, {required: true});
  const repoToken = getInput(InputNames.RepoToken, {required: false});

  if (!semver.valid(dokuVersion)) {
    core.setFailed(`Invalid doku version format: ${dokuVersion}`);
  }

  if (!semver.valid(docFxVersion)) {
    core.setFailed(`Invalid DocFx version format: ${docFxVersion}`);
  }

  return {
    docFxVersion: dokuVersion,
    dokuVersion: docFxVersion,
    repoToken: repoToken
  };
}
