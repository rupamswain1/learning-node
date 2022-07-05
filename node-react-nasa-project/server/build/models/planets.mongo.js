"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PlanetSchema = new mongoose_1.Schema({
    planetName: {
        required: true,
        type: String,
    },
});
const Planets = (0, mongoose_1.model)('Planet', PlanetSchema);
exports.default = Planets;
