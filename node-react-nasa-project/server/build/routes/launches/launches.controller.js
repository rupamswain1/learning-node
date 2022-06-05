"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpDeleteLaunch = exports.httpAddLaunch = exports.httpGetAllLaunches = void 0;
const launches_model_1 = require("../../models/launches.model");
const httpGetAllLaunches = (req, res) => {
    return res.status(200).json(launches_model_1.getAllLaunches());
};
exports.httpGetAllLaunches = httpGetAllLaunches;
const httpAddLaunch = (req, res) => {
    const launch = req.body;
    console.log(launch.mission, !launch.rocket, !launch.launchDate, !launch.destination);
    if (!launch.mission ||
        !launch.rocket ||
        !launch.launchDate ||
        !launch.destination) {
        return res.status(400).json({ error: 'invalid launch property', launch });
    }
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({ error: 'invalid launch date' });
    }
    launches_model_1.addNewLaunch(launch);
    return res.status(201).json(launches_model_1.getAllLaunches());
};
exports.httpAddLaunch = httpAddLaunch;
const httpDeleteLaunch = (req, res) => {
    const flightNumber = Number(req.params.flightNumber);
    let launch = launches_model_1.getLaunchByFlightNumber(flightNumber);
    if (launch.length > 0) {
        launch = launches_model_1.abortLaunch(flightNumber);
        return res.status(200).json(launch);
    }
    return res.status(400).json(`FlightNumber: ${flightNumber} is not found`);
};
exports.httpDeleteLaunch = httpDeleteLaunch;
