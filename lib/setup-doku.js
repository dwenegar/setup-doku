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
exports.setupDoku = void 0;
const core = __importStar(require("@actions/core"));
const path_1 = require("path");
const input_helper_1 = require("./input-helper");
const installer_1 = require("./installer");
function addPath(value) {
    core.addPath(value);
    core.info(`Added ${value} to PATH`);
}
async function setupDoku() {
    try {
        const inputs = input_helper_1.getInputs();
        const installPrefix = path_1.join(process.cwd(), '.install');
        const dokuVersion = inputs.dokuVersion;
        core.info(`Setup Doku version ${dokuVersion}`);
        const dokuPath = await installer_1.installDoku(inputs.repoToken, dokuVersion, installPrefix);
        addPath(dokuPath);
        core.info(`Setup DocFx`);
        const docFxPath = await installer_1.installDocFx(inputs.repoToken, installPrefix);
        addPath(docFxPath);
    }
    catch (e) {
        if (typeof e === 'string') {
            core.setFailed(e);
        }
        else if (e instanceof Error) {
            core.setFailed(e.message);
        }
    }
}
exports.setupDoku = setupDoku;
