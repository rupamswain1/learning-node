"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth2_1 = require("passport-google-oauth2");
const path_1 = __importDefault(require("path"));
const CONFIG = {
    CLIENT_ID: process.env.CLIENT_ID || '',
    CLIENT_SECRET: process.env.CLIENT_SECRET || '',
};
// const AUTH_OPTIONS = {
//   callbackURL: '/auth/google/callback',
//   clientSecret: CONFIG.CLIENT_SECRET,
//   clientID: CONFIG.CLIENT_ID,
// }
const AUTH_OPTIONS = {
    clientID: CONFIG.CLIENT_ID,
    clientSecret: CONFIG.CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
};
const VerifyCallback = (accessToken, refreshToken, profile, done) => {
    console.log('Google profile', profile);
    done(null, profile);
};
passport_1.default.use(new passport_google_oauth2_1.Strategy(AUTH_OPTIONS, VerifyCallback));
const app = express_1.default();
app.use(helmet_1.default());
app.use(passport_1.default.initialize());
app.get('/auth/google', passport_1.default.authenticate('google', {
    scope: ['email'],
}));
app.get('/auth/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: '/faliure',
    successRedirect: '/',
    session: false,
}), (req, res) => {
    console.log('google called back');
});
app.get('/auth/logout', (req, res) => {
    res.send('Logout');
});
app.get('/secret', (req, res) => {
    res.status(200).send('Your Secret is LOL!!!');
});
app.get('/falure', (req, res) => {
    return res.send('Failed to login');
});
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'index.html'));
});
exports.default = app;
