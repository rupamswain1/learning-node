"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGetUpcomingLaunch = exports.httpGetHistoricalLaunch = exports.httpDeleteLaunch = exports.httpAddLaunch = exports.httpGetAllLaunches = void 0;
const launches_model_1 = require("../../models/launches.model");
const httpGetAllLaunches = (req, res) => {
    return res.status(200).json((0, launches_model_1.getAllLaunches)());
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
    (0, launches_model_1.addNewLaunch)(launch);
    return res.status(201).json((0, launches_model_1.getAllLaunches)());
};
exports.httpAddLaunch = httpAddLaunch;
const httpDeleteLaunch = (req, res) => {
    const flightNumber = Number(req.params.flightNumber);
    let launch = (0, launches_model_1.getLaunchByFlightNumber)(flightNumber);
    if (launch.length > 0) {
        launch = (0, launches_model_1.abortLaunch)(flightNumber);
        return res.status(200).json(launch);
    }
    return res.status(400).json(`FlightNumber: ${flightNumber} is not found`);
};
exports.httpDeleteLaunch = httpDeleteLaunch;
const httpGetHistoricalLaunch = (req, res) => {
    const historicalLaunches = (0, launches_model_1.getHistoricalLaunches)();
    return res.status(200).json(historicalLaunches);
};
exports.httpGetHistoricalLaunch = httpGetHistoricalLaunch;
const httpGetUpcomingLaunch = (req, res) => {
    const upcomingLaunch = (0, launches_model_1.getUpcomingLaunches)();
    return res.status(200).json(upcomingLaunch);
};
exports.httpGetUpcomingLaunch = httpGetUpcomingLaunch;
