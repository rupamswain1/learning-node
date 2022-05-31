"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const planets_controller_1 = require("./planets.controller");
const getPlanetRouter = express_1.default.Router();
getPlanetRouter.get('/planets', planets_controller_1.httpGetAllPlanets);
exports.default = getPlanetRouter;
