"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LaunchSchema = new mongoose_1.Schema({
    flightNumber: {
        required: true,
        type: Number,
        min: 100,
        max: 999,
    },
    mission: {
        required: true,
        type: String,
    },
    rocket: {
        required: true,
        type: String,
    },
    launchDate: {
        required: true,
        type: Date,
    },
    destination: {
        required: true,
        type: String,
    },
    customer: [String],
    upcoming: {
        required: true,
        type: Boolean,
    },
    success: {
        required: true,
        type: Boolean,
        default: true,
    },
});
const Launches = (0, mongoose_1.model)('Launch', LaunchSchema);
exports.default = Launches;
