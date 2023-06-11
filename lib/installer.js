"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installDocFx = exports.installDoku = void 0;
const tc = __importStar(require("@actions/tool-cache"));
const core = __importStar(require("@actions/core"));
const path = __importStar(require("path"));
const sys = __importStar(require("./system"));
const fs = __importStar(require("fs"));
async function extractArchive(archivePath, archiveSuffix, destPath) {
    core.info(`Extracting ${archivePath} to ${destPath}`);
    if (archiveSuffix === 'zip') {
        return await tc.extractZip(archivePath, destPath);
    }
    return await tc.extractTar(archivePath, destPath);
}
function getDokuDownloadUrl(version) {
    const platform = sys.getPlatform();
    const arch = sys.getArch();
    const archiveSuffix = sys.getArchiveSuffix();
    const targetAssetName = `doku.${version}.${platform}-${arch}.${archiveSuffix}`;
    return `https://github.com/dwenegar/doku/releases/download/${version}/${targetAssetName}`;
}
async function installDoku(authToken, version, installPath) {
    try {
        core.info(`Attempting to install Doku ${version}`);
        const url = getDokuDownloadUrl(version);
        core.info(`Downloading Doku ${version} from ${url}`);
        const downloadPath = await tc.downloadTool(url, undefined, authToken);
        const archiveSuffix = sys.getArchiveSuffix();
        const dokuInstallPath = await extractArchive(downloadPath, archiveSuffix, path.join(installPath, 'doku'));
        if (sys.getPlatform() != 'win32') {
            const dokuPath = path.join(dokuInstallPath, 'doku');
            fs.chmodSync(dokuPath, 0o755);
        }
        core.info(`Installed doku in ${dokuInstallPath}`);
        return dokuInstallPath;
    }
    catch (err) {
        throw new Error(`Failed to install Lua version ${version}: ${err}`);
    }
}
exports.installDoku = installDoku;
function getDocFxDownloadUrl(version) {
    const platform = sys.getPlatform();
    const arch = sys.getArch();
    const targetAssetName = `docfx-${platform}-${arch}-v${version}.zip`;
    return `https://github.com/dotnet/docfx/releases/download/v${version}/${targetAssetName}`;
}
async function installDocFx(authToken, version, installPath) {
    try {
        core.info('Attempting to install DocFx');
        const url = getDocFxDownloadUrl(version);
        core.info(`Downloading DocFx from ${url}`);
        const downloadPath = await tc.downloadTool(url, undefined, authToken);
        const docFxInstallPath = await extractArchive(downloadPath, 'zip', path.join(installPath, 'docfx'));
        if (sys.getPlatform() != 'win32') {
            const docFxPath = path.join(docFxInstallPath, 'docfx');
            fs.chmodSync(docFxPath, 0o755);
        }
        core.info(`Installed DocFx in ${docFxInstallPath}`);
        return docFxInstallPath;
    }
    catch (err) {
        throw new Error(`Failed to install DocFX: ${err}`);
    }
}
exports.installDocFx = installDocFx;
