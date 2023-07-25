"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createCourse = joi_1.default.object({
    category_id: joi_1.default.array().required(),
    instructor_id: joi_1.default.number().required(),
    status_id: joi_1.default.number().required(),
    type_course: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    quota: joi_1.default.number().required(),
    price: joi_1.default.number().required(),
    discount: joi_1.default.number().required(),
    start_register: joi_1.default.date().required(),
    finish_register: joi_1.default.date(),
    start_course: joi_1.default.date().required(),
    finish_course: joi_1.default.date().required(),
});
const updateCourse = joi_1.default.object({
    category_id: joi_1.default.array(),
    instructor_id: joi_1.default.number(),
    status_id: joi_1.default.number(),
    type_course: joi_1.default.string(),
    name: joi_1.default.string(),
    description: joi_1.default.string(),
    quota: joi_1.default.number(),
    price: joi_1.default.number(),
    discount: joi_1.default.number(),
    start_register: joi_1.default.date(),
    finish_register: joi_1.default.date(),
    start_course: joi_1.default.date(),
    finish_course: joi_1.default.date(),
});
exports.default = {
    createCourse,
    updateCourse
};
//# sourceMappingURL=CourseValidation.js.map