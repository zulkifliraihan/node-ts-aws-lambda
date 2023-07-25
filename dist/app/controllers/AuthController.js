"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnResponse_1 = __importDefault(require("../traits/ReturnResponse"));
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async authentication(req, res) {
        try {
            const auth = await this.authService.authentication(req);
            let response;
            if (auth.status) {
                response = ReturnResponse_1.default.success(null, auth.data, auth.message);
            }
            else {
                if (auth.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(auth.errors);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(auth.data);
                }
            }
            return res.status(response.response_code).json(response);
        }
        catch (error) {
            const response = ReturnResponse_1.default.errorServer(error.message);
            return res.status(response.response_code).json(response);
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map