"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryValidation_1 = __importDefault(require("../validation/CategoryValidation"));
class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async getData() {
        const categories = await this.categoryRepository.getData();
        const returnData = {
            status: true,
            response: "get",
            data: categories,
        };
        return returnData;
    }
    async createData(data) {
        let returnData;
        const { error } = CategoryValidation_1.default.createCategory.validate(data, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };
            return returnData;
        }
        const dataCategory = {
            name: data.name
        };
        const category = await this.categoryRepository.createData(dataCategory);
        returnData = {
            status: true,
            response: "created",
            data: category,
        };
        return returnData;
    }
    async detailData(id) {
        const categories = await this.categoryRepository.detailData(id);
        let returnData;
        if (categories) {
            returnData = {
                status: true,
                response: "get",
                data: categories,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Category Not Found",
            };
        }
        return returnData;
    }
    async updateData(id, data) {
        var _a;
        const { error } = CategoryValidation_1.default.updateCategory.validate(data, { abortEarly: false });
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
        const checkCategory = await this.categoryRepository.detailData(id);
        if (!checkCategory) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Category Not Found",
                errors: null
            };
            return returnData;
        }
        const dataCategory = {
            name: (_a = data.name, (_a !== null && _a !== void 0 ? _a : undefined))
        };
        const category = await this.categoryRepository.updateData(id, dataCategory);
        returnData = {
            status: true,
            response: "updated",
            data: category,
        };
        return returnData;
    }
    async deleteData(id) {
        const checkCategory = await this.categoryRepository.detailData(id);
        let returnData;
        if (!checkCategory) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Category Not Found",
                errors: null
            };
            return returnData;
        }
        const categories = await this.categoryRepository.deleteData(id);
        if (categories) {
            returnData = {
                status: true,
                response: "deleted",
                data: categories,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Category Not Found",
            };
        }
        return returnData;
    }
}
exports.default = CategoryService;
//# sourceMappingURL=CategoryService.js.map