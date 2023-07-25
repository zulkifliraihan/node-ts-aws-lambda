"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnResponse_1 = __importDefault(require("../traits/ReturnResponse"));
class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async getData(req, res) {
        try {
            const categories = await this.categoryService.getData();
            let response;
            if (categories.status) {
                response = ReturnResponse_1.default.success(categories.response, categories.data);
            }
            else {
                response = ReturnResponse_1.default.errorServer(categories.data);
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
            const categories = await this.categoryService.createData(data);
            let response;
            if (categories.status) {
                response = ReturnResponse_1.default.success(categories.response, categories.data);
            }
            else {
                if (categories.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(categories.errors);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(categories.errors, categories.message);
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
            const categories = await this.categoryService.detailData(id);
            let response;
            if (categories.status) {
                response = ReturnResponse_1.default.success(categories.response, categories.data);
            }
            else {
                if (categories.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(null, categories.message);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(categories.data);
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
            const categories = await this.categoryService.updateData(id, req.body);
            let response;
            if (categories.status) {
                response = ReturnResponse_1.default.success(categories.response, categories.data);
            }
            else {
                if (categories.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(categories.errors, categories.message);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(categories.data);
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
            const categories = await this.categoryService.deleteData(id);
            let response;
            if (categories.status) {
                response = ReturnResponse_1.default.success(categories.response, categories.data);
            }
            else {
                if (categories.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(null, categories.message);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(categories.data);
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
exports.default = CategoryController;
//# sourceMappingURL=CategoryController.js.map