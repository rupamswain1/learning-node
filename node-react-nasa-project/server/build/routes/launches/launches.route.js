"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchRouter = void 0;
const express_1 = __importDefault(require("express"));
const launches_controller_1 = require("../../routes/launches/launches.controller");
exports.launchRouter = express_1.default.Router();
exports.launchRouter.get('/launches', launches_controller_1.httpGetAllLaunches);
exports.launchRouter.post('/launches', launches_controller_1.httpAddLaunch);
