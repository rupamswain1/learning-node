"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./routes/api"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
}));
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.use('/v1', api_1.default);
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'index.html'));
});
//this is a test comm
exports.default = app;
