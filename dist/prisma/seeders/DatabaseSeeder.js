"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const RoleSeeder_1 = __importDefault(require("./RoleSeeder"));
const UserSeeder_1 = __importDefault(require("./UserSeeder"));
const CategorySeeder_1 = __importDefault(require("./CategorySeeder"));
const StatusCourseSeeder_1 = __importDefault(require("./StatusCourseSeeder"));
class DatabaseSeeder {
    async main() {
        const args = process.argv.slice(2);
        if (args.includes("--reset")) {
            console.log("---- INCLUDE RESET ----");
            await new Promise((resolve, reject) => {
                child_process_1.exec("npx prisma migrate reset --force", (err, stdout, stderr) => {
                    if (err) {
                        console.error("Error Drop All Tables");
                        console.error(err);
                        reject();
                        return;
                    }
                    resolve();
                });
            });
            await new Promise((resolve, reject) => {
                child_process_1.exec("npx prisma migrate dev", (err, stdout, stderr) => {
                    if (err) {
                        console.error("Error Re-migrate All Tables");
                        console.error(err);
                        reject();
                        return;
                    }
                    resolve();
                });
            });
        }
        await RoleSeeder_1.default.seed();
        await UserSeeder_1.default.seed();
        await CategorySeeder_1.default.seed();
        await StatusCourseSeeder_1.default.seed();
    }
}
new DatabaseSeeder().main();
//# sourceMappingURL=DatabaseSeeder.js.map