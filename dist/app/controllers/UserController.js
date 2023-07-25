"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnResponse_1 = __importDefault(require("../traits/ReturnResponse"));
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getData(req, res) {
        try {
            const users = await this.userService.getData();
            let response;
            if (users.status) {
                response = ReturnResponse_1.default.success(users.response, users.data);
            }
            else {
                response = ReturnResponse_1.default.errorServer(users.data);
            }
            return res.status(response.response_code).json(response);
        }
        catch (error) {
            const response = ReturnResponse_1.default.errorServer(error.message);
            return res.status(response.response_code).json(response);
        }
    }
    async createData(req, res) {
        try {
            const data = req.body;
            const users = await this.userService.createData(data);
            let response;
            if (users.status) {
                response = ReturnResponse_1.default.success(users.response, users.data);
            }
            else {
                if (users.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(users.errors);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(users.errors, users.message);
                }
            }
            return res.status(response.response_code).json(response);
        }
        catch (error) {
            const response = ReturnResponse_1.default.errorServer(error.message);
            return res.status(response.response_code).json(response);
        }
    }
    async detailData(req, res) {
        const id = parseInt(req.params.id);
        try {
            const users = await this.userService.detailData(id);
            let response;
            if (users.status) {
                response = ReturnResponse_1.default.success(users.response, users.data);
            }
            else {
                if (users.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(null, users.message);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(users.data);
                }
            }
            return res.status(response.response_code).json(response);
        }
        catch (error) {
            const response = ReturnResponse_1.default.errorServer(error.message);
            return res.status(response.response_code).json(response);
        }
    }
    async updateData(req, res) {
        const id = parseInt(req.params.id);
        try {
            const users = await this.userService.updateData(id, req.body);
            let response;
            if (users.status) {
                response = ReturnResponse_1.default.success(users.response, users.data);
            }
            else {
                if (users.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(users.errors, users.message);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(users.data);
                }
            }
            return res.status(response.response_code).json(response);
        }
        catch (error) {
            const response = ReturnResponse_1.default.errorServer(error.message);
            return res.status(response.response_code).json(response);
        }
    }
    async deleteData(req, res) {
        const id = parseInt(req.params.id);
        try {
            const users = await this.userService.deleteData(id);
            let response;
            if (users.status) {
                response = ReturnResponse_1.default.success(users.response, users.data);
            }
            else {
                if (users.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(null, users.message);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(users.data);
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
exports.default = UserController;
//# sourceMappingURL=UserController.js.map