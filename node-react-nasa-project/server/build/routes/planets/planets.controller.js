"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlanets = void 0;
const planets_model_1 = require("../../models/planets.model");
const getAllPlanets = (req, res) => {
    return res.status(200).json(planets_model_1.planets);
};
exports.getAllPlanets = getAllPlanets;
