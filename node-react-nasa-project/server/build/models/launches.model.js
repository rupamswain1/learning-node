"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abortLaunch = exports.getLaunchByFlightNumber = exports.addNewLaunch = exports.getAllLaunches = exports.launches = void 0;
let latestFlightNumber = 100;
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
];
const getAllLaunches = () => {
    return exports.launches;
};
exports.getAllLaunches = getAllLaunches;
const addNewLaunch = (launch) => {
    latestFlightNumber++;
    const newLaunch = Object.assign({ flightNumber: latestFlightNumber, success: true, upcoming: true, customer: ['Rupam Swain'] }, launch);
    exports.launches.push(newLaunch);
};
exports.addNewLaunch = addNewLaunch;
const getLaunchByFlightNumber = (flightNumber) => {
    return exports.launches.filter((launch) => launch.flightNumber === flightNumber);
};
exports.getLaunchByFlightNumber = getLaunchByFlightNumber;
const abortLaunch = (flightNumber) => {
    return exports.launches.filter((launch) => {
        if (launch.flightNumber === flightNumber) {
            launch.upcoming = false;
            launch.success = false;
        }
        return launch;
    });
};
exports.abortLaunch = abortLaunch;
