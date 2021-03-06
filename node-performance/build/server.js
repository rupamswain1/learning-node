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
const http_1 = __importDefault(require("http"));
//Importing node cluster module
const cluster_1 = __importDefault(require("cluster"));
// import os from 'os'
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 8000;
const server = http_1.default.createServer(app_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('initializing server ');
    server.listen(PORT, () => {
        console.log(`Listining on port ${PORT}`);
    });
});
if (cluster_1.default.isPrimary) {
    console.log('Primary thread');
    //fork the server
    // const NUMBER_WORKERS = os.cpus().length
    // for (let i = 0; i < NUMBER_WORKERS; i++) {
    //   cluster.fork()
    // }
}
else {
    console.log('this is the worker thread');
    startServer();
}
