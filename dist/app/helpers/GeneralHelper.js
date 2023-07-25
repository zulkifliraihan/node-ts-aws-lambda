"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
class GeneralHelper {
    async generateInvoiceNumber(type) {
        const invoice_number = `-CMI-${type}-` + new Date().toISOString().slice(5, 7) + new Date().toISOString().slice(0, 4);
        const last_invoice_number = await prisma_1.default.invoice.findFirst({
            where: {
                invoice_number: {
                    contains: invoice_number,
                },
            },
            orderBy: {
                invoice_number: 'desc',
            },
        });
        let first_digit_invoice;
        if (last_invoice_number) {
            const split_number_invoice = last_invoice_number.invoice_number.split('-');
            first_digit_invoice = parseInt(split_number_invoice[0]) + 1;
        }
        else {
            first_digit_invoice = 1;
        }
        const digit_invoice = first_digit_invoice.toString().padStart(3, '0');
        return digit_invoice + invoice_number;
    }
}
exports.default = new GeneralHelper();
//# sourceMappingURL=GeneralHelper.js.map