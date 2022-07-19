"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGetUpcomingLaunch = exports.httpGetHistoricalLaunch = exports.httpDeleteLaunch = exports.httpAddLaunch = exports.httpGetAllLaunches = void 0;
const launches_model_1 = require("../../models/launches.model");
const httpGetAllLaunches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { page, limit } = req.query;
    page = Math.abs(+page) || 1;
    limit = Math.abs(+limit) || 0;
    const skip = Math.abs(limit * (page - 1));
    return res.status(200).json(yield (0, launches_model_1.getAllLaunches)({ skip, limit }));
});
exports.httpGetAllLaunches = httpGetAllLaunches;
const httpAddLaunch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const launch = req.body;
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
    try {
        yield (0, launches_model_1.scheduleNewLaunch)(launch);
        return res.status(201).json(yield (0, launches_model_1.getAllLaunches)({ skip: 0, limit: 0 }));
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
exports.httpAddLaunch = httpAddLaunch;
const httpDeleteLaunch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const flightNumber = Number(req.params.flightNumber);
    let launch = yield (0, launches_model_1.getLaunchByflightNumber)(flightNumber);
    if (launch.length > 0) {
        console.log('inside if');
        const success = yield (0, launches_model_1.abortLaunch)(flightNumber);
        console.log(success);
        if (success) {
            return res.status(200).json(launch);
        }
        else {
            return res.status(500).json({ message: 'launch failed' });
        }
    }
    return res.status(400).json(`FlightNumber: ${flightNumber} is not found`);
});
exports.httpDeleteLaunch = httpDeleteLaunch;
const httpGetHistoricalLaunch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const historicalLaunches = yield (0, launches_model_1.getHistoricalLaunches)();
    return res.status(200).json(historicalLaunches);
});
exports.httpGetHistoricalLaunch = httpGetHistoricalLaunch;
const httpGetUpcomingLaunch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const upcomingLaunch = yield (0, launches_model_1.getUpcomingLaunches)();
    return res.status(200).json(upcomingLaunch);
});
exports.httpGetUpcomingLaunch = httpGetUpcomingLaunch;
