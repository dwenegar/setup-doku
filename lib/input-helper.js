"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.getInputs = void 0;
const core = __importStar(require("@actions/core"));
const core_1 = require("@actions/core");
const constants_1 = require("./constants");
const VALID_DOKU_VERSIONS = ['0.3.1', '0.3.2', '0.3.3', '0.3.4', '0.3.5'];
const DOKU_VERSION_ALIASES = {
    '0.3': '0.3.5',
    latest: '0.3.5'
};
const VALID_DOCFX_VERSIONS = ['2.57.2'];
const LUAROCKS_VERSION_ALIASES = {
    '2.57': '2.57.2',
    latest: '2.57.2'
};
function getInputs() {
    const dokuVersion = core_1.getInput(constants_1.InputNames.DokuVersion, { required: true });
    const docfxVersion = core_1.getInput(constants_1.InputNames.DocFxVersion, { required: true });
    const repoToken = core_1.getInput(constants_1.InputNames.RepoToken, { required: false });
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
exports.getInputs = getInputs;
