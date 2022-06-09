"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGetAllPlanets = void 0;
const planets_model_1 = require("../../models/planets.model");
const httpGetAllPlanets = (req, res) => {
    return res.status(200).json((0, planets_model_1.getHabitablePlanets)());
};
exports.httpGetAllPlanets = httpGetAllPlanets;
