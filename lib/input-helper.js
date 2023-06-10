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
const semver = __importStar(require("semver"));
const core_1 = require("@actions/core");
const constants_1 = require("./constants");
function getInputs() {
    const dokuVersion = (0, core_1.getInput)(constants_1.InputNames.DokuVersion, { required: true });
    const docFxVersion = (0, core_1.getInput)(constants_1.InputNames.DocFxVersion, { required: true });
    const repoToken = (0, core_1.getInput)(constants_1.InputNames.RepoToken, { required: false });
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
exports.getInputs = getInputs;
