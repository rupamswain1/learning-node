"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
// import http from 'http'
const app_1 = __importDefault(require("./app"));
const mongoDB_1 = require("./services/mongoDB");
const planets_model_1 = require("./models/planets.model");
const launches_model_1 = require("./models/launches.model");
const PORT = process.env.PORT || 8000;
const server = https_1.default.createServer({
    key: fs_1.default.readFileSync('key.pem'),
    cert: fs_1.default.readFileSync('cert.pem'),
}, app_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoDB_1.mongoConnect)();
    yield (0, planets_model_1.loadPlanets)();
    yield (0, launches_model_1.loadLaunchData)();
    server.listen(PORT, () => {
        console.log(`Listining on port ${PORT}`);
    });
});
startServer();
