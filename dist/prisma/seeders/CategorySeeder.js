"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const faker_1 = require("@faker-js/faker");
class CategorySeeder {
    async seed() {
        try {
            for (let i = 0; i < 10; i++) {
                const data = {
                    name: faker_1.faker.commerce.department(),
                };
                const category = await prisma_1.default.category.create({ data });
            }
            console.log(`✨ ---- Successfully Seed CategorySeeder ---- ✨`);
        }
        catch (error) {
            console.log(`🔥 ---- Failed Seed CategorySeeder ---- 🔥`);
            console.log(error.message);
        }
    }
}
exports.default = new CategorySeeder();
//# sourceMappingURL=CategorySeeder.js.map