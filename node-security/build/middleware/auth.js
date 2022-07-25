"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth = (req, res, next) => {
    const isLoggedIn = true;
    if (isLoggedIn) {
        next();
    }
    else {
        res.status(401).json({ message: 'You must login' });
    }
};
exports.auth = auth;
