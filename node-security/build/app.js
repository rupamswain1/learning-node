"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const cookie_session_1 = __importDefault(require("cookie-session"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth2_1 = require("passport-google-oauth2");
const path_1 = __importDefault(require("path"));
const CONFIG = {
    CLIENT_ID: process.env.CLIENT_ID || '',
    CLIENT_SECRET: process.env.CLIENT_SECRET || '',
    COOKIE_1: process.env.COOKIE_1 || '',
    COOKIE_2: process.env.COOKIE_2 || '',
};
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
//Save the session to the cookie
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
//Read the session from the cookie
passport_1.default.deserializeUser((id, done) => {
    done(null, id);
});
const app = express_1.default();
app.use(helmet_1.default());
app.use(cookie_session_1.default({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [CONFIG.COOKIE_1, CONFIG.COOKIE_2],
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get('/auth/google', passport_1.default.authenticate('google', {
    scope: ['email'],
}));
app.get('/auth/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: '/faliure',
    successRedirect: '/',
    session: true,
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
