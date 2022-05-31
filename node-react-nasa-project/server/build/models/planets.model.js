"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHabitablePlanets = exports.loadPlanets = exports.planets = void 0;
const csv_parse_1 = require("csv-parse");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.planets = [];
const isHabitable = (planet) => {
    return (planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6);
};
const loadPlanets = () => {
    return new Promise((resolve, reject) => {
        fs_1.default.createReadStream(path_1.default.join(__dirname, '..', '..', './data/kepler_data.csv'))
            .pipe(csv_parse_1.parse({
            comment: '#',
            columns: true,
        }))
            .on('data', (data) => {
            if (isHabitable(data)) {
                exports.planets.push(data.kepler_name);
            }
        })
            .on('error', (err) => {
            console.log(err);
            reject();
        })
            .on('end', () => {
            resolve();
        });
    });
};
exports.loadPlanets = loadPlanets;
const getHabitablePlanets = () => {
    return exports.planets;
};
exports.getHabitablePlanets = getHabitablePlanets;
