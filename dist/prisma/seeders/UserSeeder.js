"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const faker_1 = require("@faker-js/faker");
const SecurityHelper_1 = __importDefault(require("../../app/helpers/SecurityHelper"));
class UserSeeder {
    async seed() {
        try {
            for (let i = 0; i < 100; i++) {
                const randomNumberRole = Math.floor(Math.random() * 2) + 1;
                const gender = ["male", "female"];
                const randomIndex = Math.floor(Math.random() * gender.length);
                const data = {
                    email: faker_1.faker.internet.email(),
                    password: new SecurityHelper_1.default().hashPassword('123123123'),
                    profiles: {
                        create: {
                            firstName: faker_1.faker.name.firstName(),
                            lastName: faker_1.faker.name.lastName(),
                            gender: gender[randomIndex],
                        }
                    },
                };
                const user = await prisma_1.default.user.create({ data });
                const dataUserHasRole = {
                    data: {
                        user_id: user.id,
                        role_id: randomNumberRole,
                    },
                };
                const userHasRole = await prisma_1.default.userHasRole.create(dataUserHasRole);
            }
            console.log(`✨ ---- Successfully Seed UserSeeder ---- ✨`);
        }
        catch (error) {
            console.log(`🔥 ---- Failed Seed UserSeeder ---- 🔥`);
            console.log(error.message);
        }
    }
}
exports.default = new UserSeeder();
//# sourceMappingURL=UserSeeder.js.map