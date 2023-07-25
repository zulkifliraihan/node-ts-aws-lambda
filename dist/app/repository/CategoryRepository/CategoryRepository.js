"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../config/prisma"));
class CategoryRepository {
    async getData() {
        const categories = await prisma_1.default.category.findMany();
        return categories;
    }
    async createData(data) {
        const category = await prisma_1.default.category.create({
            data
        });
        return category;
    }
    async detailData(id) {
        const category = await prisma_1.default.category.findUnique({
            where: {
                id: id
            }
        });
        return category;
    }
    async updateData(id, data) {
        const category = await prisma_1.default.category.update({
            where: {
                id
            },
            data
        });
        return category;
    }
    async deleteData(id) {
        const category = await prisma_1.default.category.delete({
            where: {
                id: id
            }
        });
        return category;
    }
}
exports.default = CategoryRepository;
//# sourceMappingURL=CategoryRepository.js.map