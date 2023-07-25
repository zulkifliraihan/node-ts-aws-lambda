"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const updateProfile = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8),
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    gender: joi_1.default.string().required()
});
exports.default = {
    updateProfile
};
//# sourceMappingURL=PublicValidation.js.map