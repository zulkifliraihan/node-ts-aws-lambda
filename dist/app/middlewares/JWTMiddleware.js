"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnResponse_1 = __importDefault(require("../traits/ReturnResponse"));
const SecurityHelper_1 = __importDefault(require("../helpers/SecurityHelper"));
const securityHelper = new SecurityHelper_1.default();
const JWTMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    let response;
    if (!authHeader) {
        response = ReturnResponse_1.default.errorServer("Token is required", "Unauthorized Access", 400);
        return res.status(response.response_code).json(response);
    }
    const token = authHeader.replace('Bearer ', '');
    try {
        const verifyToken = securityHelper.verifyToken(token);
        const data = verifyToken.data;
        const currentUser = req.session.currentUser;
        if (!currentUser) {
            response = ReturnResponse_1.default.errorServer("Session is expired", "Unauthorized Access", 400);
            return res.status(response.response_code).json(response);
        }
        if (currentUser.id != data.id) {
            response = ReturnResponse_1.default.errorServer("Unmatch Authentication ", "Unauthorized Access", 400);
            return res.status(response.response_code).json(response);
        }
        return next();
    }
    catch (error) {
        response = ReturnResponse_1.default.errorServer(error.message, "Unauthorized Access", 400);
        return res.status(response.response_code).json(response);
    }
};
exports.default = JWTMiddleware;
//# sourceMappingURL=JWTMiddleware.js.map