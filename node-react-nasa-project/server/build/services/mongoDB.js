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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDisconnect = exports.mongoConnect = void 0;
const mongoose_1 = require("mongoose");
mongoose_1.connection.once('open', () => {
    console.log('MongoDB connection Eshtablished');
});
mongoose_1.connection.on('error', () => {
    console.log('mongoDB connection failed');
});
const MONGO_URL = process.env.mongo_url || 'dummy url';
const mongoConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(MONGO_URL)
    yield (0, mongoose_1.connect)(MONGO_URL);
});
exports.mongoConnect = mongoConnect;
const mongoDisconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.disconnect)();
});
exports.mongoDisconnect = mongoDisconnect;
