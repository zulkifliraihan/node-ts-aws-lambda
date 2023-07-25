"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnResponse_1 = __importDefault(require("../traits/ReturnResponse"));
class PublicController {
    constructor(publicService) {
        this.publicService = publicService;
    }
    async updateProfile(req, res) {
        const currentUser = req.session.currentUser;
        const id = parseInt(currentUser.id);
        try {
            const publicService = await this.publicService.updateProfile(id, req.body);
            let response;
            if (publicService.status) {
                response = ReturnResponse_1.default.success(publicService.response, publicService.data);
            }
            else {
                if (publicService.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(publicService.errors, publicService.message);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(publicService.data);
                }
            }
            return res.status(response.response_code).json(response);
        }
        catch (error) {
            const response = ReturnResponse_1.default.errorServer(error.message);
            return res.status(response.response_code).json(response);
        }
    }
    async allCourse(req, res) {
        try {
            const courses = await this.publicService.allCourse();
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
    async enrollCourse(req, res) {
        const course_id = parseInt(req.params.courseId);
        try {
            const currentUser = req.session.currentUser;
            const courses = await this.publicService.enrollCourse(course_id, currentUser);
            let response;
            if (courses.status) {
                response = ReturnResponse_1.default.success(null, courses.data, courses.message);
            }
            else {
                if (courses.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(courses.errors);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(courses.data);
                }
            }
            return res.status(response.response_code).json(response);
        }
        catch (error) {
            console.log(error);
            const response = ReturnResponse_1.default.errorServer(error.message);
            return res.status(response.response_code).json(response);
        }
    }
}
exports.default = PublicController;
//# sourceMappingURL=PublicController.js.map