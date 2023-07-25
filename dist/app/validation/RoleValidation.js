"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createRole = joi_1.default.object({
    name: joi_1.default.string().required()
});
const updateRole = joi_1.default.object({
    name: joi_1.default.string()
});
exports.default = {
    createRole,
    updateRole
};
//# sourceMappingURL=RoleValidation.js.map