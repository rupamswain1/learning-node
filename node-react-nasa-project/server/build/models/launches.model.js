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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestflightNumber = exports.getUpcomingLaunches = exports.getHistoricalLaunches = exports.abortLaunch = exports.getLaunchByflightNumber = exports.scheduleNewLaunch = exports.getAllLaunches = exports.saveLaunch = exports.launches = void 0;
const launches_mongo_1 = __importDefault(require("./launches.mongo"));
const planets_model_1 = require("./planets.model");
const DEFAULT_FLIGHT_number = 100;
let latestflightNumber = 100;
exports.launches = [
    {
        flightNumber: 1,
        mission: 'mangal',
        rocket: 'mangal yaan',
        launchDate: new Date('2015-03-25'),
        destination: 'Mars',
        customer: ['Bhartiya', 'Elon'],
        upcoming: true,
        success: true,
    },
    {
        flightNumber: 2,
        mission: 'Moon',
        rocket: 'chandra yaan',
        launchDate: new Date('2030-03-25'),
        destination: 'Moon',
        customer: ['Elon'],
        upcoming: true,
        success: true,
    },
];
const saveLaunch = (launch) => __awaiter(void 0, void 0, void 0, function* () {
    const planet = yield (0, planets_model_1.getPlanetByName)(launch.destination);
    if (!planet) {
        throw new Error('planet not found');
    }
    yield launches_mongo_1.default.updateOne({ flightNumber: launch.flightNumber }, launch, {
        upsert: true,
    });
});
exports.saveLaunch = saveLaunch;
// saveLaunch(launches[0])
const getAllLaunches = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield launches_mongo_1.default.find({}, { __v: 0, _id: 0 });
});
exports.getAllLaunches = getAllLaunches;
const scheduleNewLaunch = (launch) => __awaiter(void 0, void 0, void 0, function* () {
    const flightNum = yield (0, exports.getLatestflightNumber)();
    yield (0, exports.saveLaunch)(Object.assign(Object.assign({}, launch), { success: true, upcoming: true, customer: ['Rupam'], flightNumber: flightNum + 1 }));
});
exports.scheduleNewLaunch = scheduleNewLaunch;
// export const addNewLaunch = (launch: any): void => {
//   latestflightNumber++
//   const newLaunch: launchInterface = {
//     flightNumber: latestflightNumber,
//     success: true,
//     upcoming: true,
//     customer: ['Rupam Swain'],
//     ...launch,
//   }
//   launches.push(newLaunch
// }
const getLaunchByflightNumber = (flightNumber) => __awaiter(void 0, void 0, void 0, function* () {
    return yield launches_mongo_1.default.find({ flightNumber: flightNumber }, { _id: 0, __v: 0 });
});
exports.getLaunchByflightNumber = getLaunchByflightNumber;
const abortLaunch = (flightNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const abortedLaunch = yield launches_mongo_1.default.updateOne({ flightNumber: flightNumber }, {
        upcoming: false,
        success: false,
    });
    return abortedLaunch.acknowledged && abortedLaunch.matchedCount > 0;
});
exports.abortLaunch = abortLaunch;
const getHistoricalLaunches = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    return yield launches_mongo_1.default.find({
        $or: [
            { launchDate: { $lt: today } },
            { upcoming: false },
            { success: false },
        ],
    }, { __v: 0, _id: 0 });
});
exports.getHistoricalLaunches = getHistoricalLaunches;
const getUpcomingLaunches = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    return yield launches_mongo_1.default.find({
        $and: [
            { upcoming: true },
            { success: true },
            { launchDate: { $gte: today } },
        ],
    }, { _id: 0, __v: 0 });
});
exports.getUpcomingLaunches = getUpcomingLaunches;
const getLatestflightNumber = () => __awaiter(void 0, void 0, void 0, function* () {
    const latestRecord = yield launches_mongo_1.default.find().sort('-flightNumber');
    if (!latestRecord) {
        return DEFAULT_FLIGHT_number;
    }
    else {
        return latestRecord[0].flightNumber;
    }
});
exports.getLatestflightNumber = getLatestflightNumber;
