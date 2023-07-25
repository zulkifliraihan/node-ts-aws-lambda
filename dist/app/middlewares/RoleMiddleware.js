"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnResponse_1 = __importDefault(require("../traits/ReturnResponse"));
const RoleMiddleware = (restrictedRole) => (req, res, next) => {
    let response;
    try {
        const currentUser = req.session.currentUser;
        const roleCurrentUseer = currentUser.userHasRoles[0].role.name;
        if (!currentUser) {
            response = ReturnResponse_1.default.errorServer("Session is expired", "Unauthorized Access", 400);
            return res.status(response.response_code).json(response);
        }
        if (restrictedRole != roleCurrentUseer) {
            response = ReturnResponse_1.default.errorServer("Restricted Role!", "Unauthorized Access", 400);
            return res.status(response.response_code).json(response);
        }
        next();
    }
    catch (error) {
        response = ReturnResponse_1.default.errorServer(error.message, "Unauthorized Access", 400);
        return res.status(response.response_code).json(response);
    }
};
exports.default = RoleMiddleware;
//# sourceMappingURL=RoleMiddleware.js.map