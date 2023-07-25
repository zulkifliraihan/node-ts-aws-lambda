"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnResponse_1 = __importDefault(require("../traits/ReturnResponse"));
class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async getData(req, res) {
        try {
            const courses = await this.courseService.getData();
            let response;
            if (courses.status) {
                response = ReturnResponse_1.default.success(courses.response, courses.data);
            }
            else {
                response = ReturnResponse_1.default.errorServer(courses.data);
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
            const courses = await this.courseService.createData(data);
            let response;
            if (courses.status) {
                response = ReturnResponse_1.default.success(courses.response, courses.data);
            }
            else {
                if (courses.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(courses.errors);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(courses.errors, courses.message);
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
            const courses = await this.courseService.detailData(id);
            let response;
            if (courses.status) {
                response = ReturnResponse_1.default.success(courses.response, courses.data);
            }
            else {
                if (courses.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(null, courses.message);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(courses.data);
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
            const courses = await this.courseService.updateData(id, req.body);
            let response;
            if (courses.status) {
                response = ReturnResponse_1.default.success(courses.response, courses.data);
            }
            else {
                if (courses.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(courses.errors, courses.message);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(courses.data);
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
            const courses = await this.courseService.deleteData(id);
            let response;
            if (courses.status) {
                response = ReturnResponse_1.default.success(courses.response, courses.data);
            }
            else {
                if (courses.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(null, courses.message);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(courses.data);
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
exports.default = CourseController;
//# sourceMappingURL=CourseController.js.map