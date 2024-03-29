import * as tc from '@actions/tool-cache';
import * as core from '@actions/core';
import * as path from 'path';
import * as sys from './system';
import * as fs from 'fs';

async function extractArchive(archivePath: string, archiveSuffix: string, destPath: string): Promise<string> {
  core.info(`Extracting ${archivePath} to ${destPath}`);
  if (archiveSuffix === 'zip') {
    return await tc.extractZip(archivePath, destPath);
  }
  return await tc.extractTar(archivePath, destPath);
}

function getDokuDownloadUrl(version: string): string {
  const platform: string = sys.getPlatform();
  const arch: string = sys.getArch();
  const archiveSuffix = sys.getArchiveSuffix();
  const targetAssetName: string = `doku.${version}.${platform}-${arch}.${archiveSuffix}`;
  return `https://github.com/dwenegar/doku/releases/download/${version}/${targetAssetName}`;
}

export async function installDoku(authToken: string, version: string, installPath: string) {
  try {
    core.info(`Attempting to install Doku ${version}`);
    const url: string = getDokuDownloadUrl(version);

    core.info(`Downloading Doku ${version} from ${url}`);
    const downloadPath: string = await tc.downloadTool(url, undefined, authToken);
    const archiveSuffix = sys.getArchiveSuffix();
    const dokuInstallPath = await extractArchive(downloadPath, archiveSuffix, path.join(installPath, 'doku'));
    if (sys.getPlatform() != 'win32') {
      const dokuPath = path.join(dokuInstallPath, 'doku');
      fs.chmodSync(dokuPath, 0o755);
    }
    core.info(`Installed doku in ${dokuInstallPath}`);
    return dokuInstallPath;
  } catch (err) {
    throw new Error(`Failed to install Lua version ${version}: ${err}`);
  }
}

function getDocFxDownloadUrl(version: string): string {
  const platform: string = sys.getPlatform();
  const arch: string = sys.getArch();
  const targetAssetName: string = `docfx-${platform}-${arch}-v${version}.zip`;
  return `https://github.com/dotnet/docfx/releases/download/v${version}/${targetAssetName}`;
}

export async function installDocFx(authToken: string, version: string, installPath: string): Promise<string> {
  try {
    core.info('Attempting to install DocFx');
    const url: string = getDocFxDownloadUrl(version);

    core.info(`Downloading DocFx from ${url}`);
    const downloadPath: string = await tc.downloadTool(url, undefined, authToken);
    const docFxInstallPath = await extractArchive(downloadPath, 'zip', path.join(installPath, 'docfx'));
    if (sys.getPlatform() != 'win32') {
      const docFxPath = path.join(docFxInstallPath, 'docfx');
      fs.chmodSync(docFxPath, 0o755);
    }
    core.info(`Installed DocFx in ${docFxInstallPath}`);
    return docFxInstallPath;
  } catch (err) {
    throw new Error(`Failed to install DocFX: ${err}`);
  }
}
