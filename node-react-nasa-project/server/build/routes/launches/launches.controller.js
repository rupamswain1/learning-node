"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpAddLaunch = exports.httpGetAllLaunches = void 0;
const launches_model_1 = require("../../models/launches.model");
const httpGetAllLaunches = (req, res) => {
    return res.status(200).json(launches_model_1.getAllLaunches());
};
exports.httpGetAllLaunches = httpGetAllLaunches;
const httpAddLaunch = (req, res) => {
    const launch = req.body;
    if (!launch.misson ||
        !launch.rocket ||
        !launch.launchDate ||
        !launch.destination ||
        !launch.customer) {
        return res.status(400).json({ error: 'invalid launch property' });
    }
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({ error: 'invalid launch date' });
    }
    launches_model_1.addNewLaunch(launch);
    return res.status(201).json(launches_model_1.getAllLaunches());
};
exports.httpAddLaunch = httpAddLaunch;
