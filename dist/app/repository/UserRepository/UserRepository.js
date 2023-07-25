"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../config/prisma"));
class UserRepository {
    async getData() {
        const users = await prisma_1.default.user.findMany({
            include: {
                profiles: true,
                userHasRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });
        return users;
    }
    async createData(data) {
        const users = await prisma_1.default.user.create({
            data,
            include: {
                profiles: true,
                userHasRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });
        return users;
    }
    async detailData(id) {
        const users = await prisma_1.default.user.findUnique({
            where: {
                id: id
            },
            include: {
                profiles: true,
                userHasRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });
        return users;
    }
    async updateData(id, data) {
        const users = await prisma_1.default.user.update({
            where: {
                id
            },
            data,
            include: {
                profiles: true,
                userHasRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });
        return users;
    }
    async deleteData(id) {
        const users = await prisma_1.default.user.delete({
            where: {
                id: id
            },
            include: {
                profiles: true,
            }
        });
        return users;
    }
    async checkEmailData(email) {
        const users = await prisma_1.default.user.findUnique({
            where: {
                email
            },
            include: {
                profiles: true,
                userHasRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });
        return users;
    }
    async latestData() {
        const user = await prisma_1.default.user.findFirst({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return user;
    }
    async updateOrCreateData(id, data) {
        const users = await prisma_1.default.user.update({
            where: {
                id
            },
            data,
            include: {
                profiles: true,
                userHasRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });
        return users;
    }
}
exports.default = UserRepository;
//# sourceMappingURL=UserRepository.js.map