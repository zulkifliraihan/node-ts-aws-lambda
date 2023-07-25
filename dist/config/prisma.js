"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaHelper_1 = __importDefault(require("../app/helpers/prismaHelper"));
const prisma = new client_1.PrismaClient();
/***********************************/
/* SOFT DELETE MIDDLEWARE */
/***********************************/
prisma.$use(async (params, next) => {
    if (params.action === 'delete' || params.action === 'deleteMany') {
        params.action = 'update';
        if (params.args.data) {
            params.args.data.updatedAt = new Date();
            params.args.data.deletedAt = new Date();
        }
        else {
            params.args.data = {
                updatedAt: new Date(),
                deletedAt: new Date(),
            };
        }
        if (params.args.include) {
            if (params.args.include) {
                const includeKeys = Object.keys(params.args.include);
                for (const key of includeKeys) {
                    if (params.args.include[key] === true && key != 'categories') {
                        params.args.data[key] = {
                            update: {
                                updatedAt: new Date(),
                                deletedAt: new Date()
                            }
                        };
                    }
                }
            }
        }
    }
    if (params.action === 'findUnique' || params.action === 'findFirst') {
        const checkUniqueColumns = await prismaHelper_1.default.checkUniqueColumns(params.model);
        if (!checkUniqueColumns) {
            params.action = 'findFirst';
            params.args.where = {
                ...params.args.where,
                deletedAt: null,
            };
        }
    }
    if (params.action === 'findMany') {
        // Find many queries
        if (params.args) {
            params.args.where = {
                ...params.args.where,
                deletedAt: null,
            };
        }
        else {
            params['args'] = {
                where: {
                    deletedAt: null
                }
            };
        }
    }
    if (params.action === 'update' || params.action === 'updateMany') {
        params.action = 'update';
        if (params.args.data) {
            params.args.data.updatedAt = new Date();
        }
        else {
            params.args.data = { updatedAt: new Date() };
        }
    }
    return next(params);
});
exports.default = prisma;
//# sourceMappingURL=prisma.js.map