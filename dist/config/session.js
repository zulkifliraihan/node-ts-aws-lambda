"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWTSecret = process.env.JWT_SECRET;
const sessionOptions = {
    secret: JWTSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000
    }
};
exports.sessionConfig = express_session_1.default(sessionOptions);
//# sourceMappingURL=session.js.map