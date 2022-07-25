"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
app.use(helmet_1.default());
app.get('/auth/google', (req, res) => { });
app.get('/auth/google/callback', (req, res) => { });
app.get('/auth/logout', (req, res) => {
    res.send('Logout');
});
app.get('/secret', (req, res) => {
    res.status(200).send('Your Secret is LOL!!!');
});
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'index.html'));
});
exports.default = app;
