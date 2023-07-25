"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnResponse_1 = __importDefault(require("../traits/ReturnResponse"));
class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    async getData(req, res) {
        try {
            const roles = await this.roleService.getData();
            let response;
            if (roles.status) {
                response = ReturnResponse_1.default.success(roles.response, roles.data);
            }
            else {
                response = ReturnResponse_1.default.errorServer(roles.data);
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
            const roles = await this.roleService.createData(data);
            let response;
            if (roles.status) {
                response = ReturnResponse_1.default.success(roles.response, roles.data);
            }
            else {
                if (roles.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(roles.errors);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(roles.errors, roles.message);
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
            const roles = await this.roleService.detailData(id);
            let response;
            if (roles.status) {
                response = ReturnResponse_1.default.success(roles.response, roles.data);
            }
            else {
                if (roles.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(null, roles.message);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(roles.data);
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
            const roles = await this.roleService.updateData(id, req.body);
            let response;
            if (roles.status) {
                response = ReturnResponse_1.default.success(roles.response, roles.data);
            }
            else {
                if (roles.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(roles.errors, roles.message);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(roles.data);
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
            const roles = await this.roleService.deleteData(id);
            let response;
            if (roles.status) {
                response = ReturnResponse_1.default.success(roles.response, roles.data);
            }
            else {
                if (roles.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(null, roles.message);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(roles.data);
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
exports.default = RoleController;
//# sourceMappingURL=RoleController.js.map