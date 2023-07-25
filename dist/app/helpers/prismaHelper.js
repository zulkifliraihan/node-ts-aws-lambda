"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PrismaHelper {
    async checkUniqueColumns(table) {
        try {
            const columns = await prisma.$queryRaw `
        SELECT COLUMN_NAME, DATA_TYPE, COLUMN_TYPE, COLUMN_KEY, IS_NULLABLE
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = 'test_suryadigitalteknologi'
        AND TABLE_NAME = ${client_1.Prisma.sql `${table}`}
      `;
            const hasUniqueColumn = columns.some((column) => column.COLUMN_KEY === "UNI");
            return hasUniqueColumn;
        }
        catch (error) {
            console.error(`Error checking unique columns for table '${table}':`, error);
            throw error;
        }
    }
}
exports.default = new PrismaHelper();
//# sourceMappingURL=prismaHelper.js.map