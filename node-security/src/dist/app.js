"use strict";
exports.__esModule = true;
require('dotenv').config();
var express_1 = require("express");
var helmet_1 = require("helmet");
var passport_1 = require("passport");
var passport_google_oauth2_1 = require("passport-google-oauth2");
var path_1 = require("path");
var CONFIG = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
};
var AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientSecret: CONFIG.CLIENT_SECRET,
    clientID: CONFIG.CLIENT_ID
};
var VerifyCallback = function (accessToken, refreshToken, profile, done) {
    console.log('Google profile', profile);
    done(null, profile);
};
passport_1["default"].use(new passport_google_oauth2_1.Strategy(AUTH_OPTIONS, VerifyCallback));
var app = express_1["default"]();
app.use(helmet_1["default"]());
app.use(passport_1["default"].initialize());
app.get('/auth/google', function (req, res) { });
app.get('/auth/google/callback', function (req, res) { });
app.get('/auth/logout', function (req, res) {
    res.send('Logout');
});
app.get('/secret', function (req, res) {
    res.status(200).send('Your Secret is LOL!!!');
});
app.get('/', function (req, res) {
    res.sendFile(path_1["default"].join(__dirname, '..', 'public', 'index.html'));
});
exports["default"] = app;
