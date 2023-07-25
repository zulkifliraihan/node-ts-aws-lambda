"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../config/prisma"));
class ProfileRepository {
    async getData() {
        const profiles = await prisma_1.default.profile.findMany();
        return profiles;
    }
    async createData(data) {
        const profiles = await prisma_1.default.profile.create({
            data,
        });
        return profiles;
    }
    async detailData(id) {
        const profiles = await prisma_1.default.profile.findUnique({
            where: {
                id: id
            },
        });
        return profiles;
    }
    async updateData(id, data) {
        const profiles = await prisma_1.default.profile.update({
            where: {
                id
            },
            data,
        });
        return profiles;
    }
    async deleteData(id) {
        const profiles = await prisma_1.default.profile.delete({
            where: {
                id: id
            }
        });
        return profiles;
    }
    async detailDyanmicData(query) {
        const profiles = await prisma_1.default.profile.findUnique(query);
        return profiles;
    }
}
exports.default = ProfileRepository;
//# sourceMappingURL=ProfileRepository.js.map