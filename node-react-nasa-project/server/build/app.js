"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const planets_route_1 = __importDefault(require("./routes/planets/planets.route"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(planets_route_1.default);
exports.default = app;
