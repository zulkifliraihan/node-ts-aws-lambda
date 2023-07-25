"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createCategory = joi_1.default.object({
    name: joi_1.default.string().required()
});
const updateCategory = joi_1.default.object({
    name: joi_1.default.string()
});
exports.default = {
    createCategory,
    updateCategory
};
//# sourceMappingURL=CategoryValidation.js.map