"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
class RoleSeeder {
    async seed() {
        try {
            const roles = [
                {
                    name: 'admin',
                },
                {
                    name: 'public',
                }
            ];
            const data = {
                data: roles
            };
            const created = await prisma_1.default.role.createMany(data);
            console.log(`✨ ---- Successfully Seed RoleSeeder ---- ✨`);
        }
        catch (error) {
            console.log(`🔥 ---- Failed Seed RoleSeeder ---- 🔥`);
            console.log(error.message);
        }
    }
}
exports.default = new RoleSeeder();
//# sourceMappingURL=RoleSeeder.js.map