"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
class StatusCourseSeeder {
    async seed() {
        try {
            const status = [
                "Draft",
                "Ready",
                "Registration",
                "Running",
                "Finished",
                "Canceled",
            ];
            for (let i = 0; i < status.length; i++) {
                // const randomIndex = Math.floor(Math.random() * status.length);
                const data = {
                    name: status[i],
                };
                const statusCourse = await prisma_1.default.statusCourse.create({ data });
            }
            console.log(`✨ ---- Successfully Seed StatusCourseSeeder ---- ✨`);
        }
        catch (error) {
            console.log(`🔥 ---- Failed Seed StatusCourseSeeder ---- 🔥`);
            console.log(error.message);
        }
    }
}
exports.default = new StatusCourseSeeder();
//# sourceMappingURL=StatusCourseSeeder.js.map