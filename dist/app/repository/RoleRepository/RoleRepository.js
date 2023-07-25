"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../config/prisma"));
class RoleRepository {
    async getData() {
        const roles = await prisma_1.default.role.findMany();
        return roles;
    }
    async createData(data) {
        const roles = await prisma_1.default.role.create({
            data
        });
        return roles;
    }
    async detailData(id) {
        const roles = await prisma_1.default.role.findUnique({
            where: {
                id: id
            }
        });
        return roles;
    }
    async updateData(id, data) {
        const roles = await prisma_1.default.role.update({
            where: {
                id
            },
            data
        });
        return roles;
    }
    async deleteData(id) {
        const roles = await prisma_1.default.role.delete({
            where: {
                id: id
            }
        });
        return roles;
    }
}
exports.default = RoleRepository;
//# sourceMappingURL=RoleRepository.js.map