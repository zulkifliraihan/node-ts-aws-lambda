"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../config/prisma"));
class CourseRepository {
    async getData() {
        const courses = await prisma_1.default.course.findMany({
            include: {
                categories: true,
                status: true,
                instructor: {
                    include: {
                        profiles: true
                    }
                },
            },
        });
        return courses;
    }
    async createData(data) {
        const courses = await prisma_1.default.course.create({
            data,
            include: {
                categories: true,
                status: true,
                instructor: {
                    include: {
                        profiles: true
                    }
                },
            },
        });
        return courses;
    }
    async detailData(id) {
        const courses = await prisma_1.default.course.findUnique({
            where: {
                id: id
            },
            include: {
                categories: true,
                status: true,
                instructor: {
                    include: {
                        profiles: true
                    }
                },
            },
        });
        return courses;
    }
    async updateData(id, data) {
        const courses = await prisma_1.default.course.update({
            where: {
                id
            },
            data,
            include: {
                categories: true,
                status: true,
                instructor: {
                    include: {
                        profiles: true
                    }
                },
            },
        });
        return courses;
    }
    async deleteData(id, include) {
        const courses = await prisma_1.default.course.delete({
            where: {
                id: id
            },
            include
        });
        return courses;
    }
    async getDataReady() {
        const courses = await prisma_1.default.course.findMany({
            where: {
                status_id: 2
            },
            include: {
                categories: true,
                status: true,
                instructor: {
                    include: {
                        profiles: true
                    }
                },
            },
        });
        return courses;
    }
}
exports.default = CourseRepository;
//# sourceMappingURL=CourseRepository.js.map