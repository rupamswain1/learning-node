"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
function delay(timer) {
    const startTime = Date.now();
    while (Date.now() - startTime < timer) { }
}
app.get('/test', (req, res) => {
    res.send(`Performace Test completed on ${process.pid}`);
});
app.get('/timer', (req, res) => {
    delay(9000);
    res.send(`timer completed on ${process.pid}`);
});
exports.default = app;
