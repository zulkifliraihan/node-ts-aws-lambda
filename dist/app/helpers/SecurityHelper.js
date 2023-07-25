"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const JWTSecret = process.env.JWT_SECRET;
class SecurityHelper {
    hashPassword(password) {
        const hash = bcrypt_1.default.hashSync(password, 10);
        return hash;
    }
    async checkPassword(reqPass, userPass) {
        const checkPassword = await bcrypt_1.default.compare(reqPass, userPass);
        return checkPassword;
    }
    generateToken(data) {
        const token = jsonwebtoken_1.default.sign({
            data: data,
        }, JWTSecret, {
            expiresIn: '2h'
        });
        return token;
    }
    verifyToken(token) {
        const verify = jsonwebtoken_1.default.verify(token, JWTSecret);
        return verify;
    }
}
exports.default = SecurityHelper;
//# sourceMappingURL=SecurityHelper.js.map