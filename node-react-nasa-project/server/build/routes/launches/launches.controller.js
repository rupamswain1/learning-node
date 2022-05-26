"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLaunches = void 0;
const launches_model_1 = require("../../models/launches.model");
const getAllLaunches = (req, res) => {
    return res.status(200).json(launches_model_1.launches);
};
exports.getAllLaunches = getAllLaunches;
