"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const planets_route_1 = __importDefault(require("./planets/planets.route"));
const launches_route_1 = require("./launches/launches.route");
const api = express_1.default.Router();
api.use(planets_route_1.default);
api.use('/launches', launches_route_1.launchRouter);
exports.default = api;
