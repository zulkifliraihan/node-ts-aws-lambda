"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RoleValidation_1 = __importDefault(require("../validation/RoleValidation"));
class RoleService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async getData() {
        const roles = await this.roleRepository.getData();
        const returnData = {
            status: true,
            response: "get",
            data: roles,
        };
        return returnData;
    }
    async createData(data) {
        let returnData;
        const { error } = RoleValidation_1.default.createRole.validate(data, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };
            return returnData;
        }
        const dataRole = {
            name: data.name
        };
        const role = await this.roleRepository.createData(dataRole);
        returnData = {
            status: true,
            response: "created",
            data: role,
        };
        return returnData;
    }
    async detailData(id) {
        const roles = await this.roleRepository.detailData(id);
        let returnData;
        if (roles) {
            returnData = {
                status: true,
                response: "get",
                data: roles,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Role Not Found",
            };
        }
        return returnData;
    }
    async updateData(id, data) {
        var _a;
        const { error } = RoleValidation_1.default.updateRole.validate(data, { abortEarly: false });
        let returnData;
        if (error) {
            const errors = error.details.map((err) => err.message);
            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };
            return returnData;
        }
        const checkRole = await this.roleRepository.detailData(id);
        if (!checkRole) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Role Not Found",
                errors: null
            };
            return returnData;
        }
        const dataRole = {
            name: (_a = data.name, (_a !== null && _a !== void 0 ? _a : undefined))
        };
        const role = await this.roleRepository.updateData(id, dataRole);
        returnData = {
            status: true,
            response: "updated",
            data: role,
        };
        return returnData;
    }
    async deleteData(id) {
        const checkRole = await this.roleRepository.detailData(id);
        let returnData;
        if (!checkRole) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Role Not Found",
                errors: null
            };
            return returnData;
        }
        const roles = await this.roleRepository.deleteData(id);
        if (roles) {
            returnData = {
                status: true,
                response: "deleted",
                data: roles,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Role Not Found",
            };
        }
        return returnData;
    }
}
exports.default = RoleService;
//# sourceMappingURL=RoleService.js.map