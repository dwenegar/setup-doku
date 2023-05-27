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
exports.getInputs = void 0;
const core = __importStar(require("@actions/core"));
const core_1 = require("@actions/core");
const constants_1 = require("./constants");
const VALID_DOKU_VERSIONS = ['1.1.0'];
const DOKU_VERSION_ALIASES = {
    latest: '1.1.0'
};
const VALID_DOCFX_VERSIONS = ['2.67.2'];
const DOCFX_VERSION_ALIASES = {
    latest: '2.67.2'
};
function getInputs() {
    const dokuVersion = (0, core_1.getInput)(constants_1.InputNames.DokuVersion, { required: true });
    const docFxVersion = (0, core_1.getInput)(constants_1.InputNames.DocFxVersion, { required: true });
    const repoToken = (0, core_1.getInput)(constants_1.InputNames.RepoToken, { required: false });
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
exports.getInputs = getInputs;
