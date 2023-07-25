"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../config/prisma"));
class PaymentService {
    async main(data) {
        let returnData;
        const invoice = await prisma_1.default.invoice.findFirst({
            where: {
                invoice_number: data.invoice_number
            }
        });
        if (!invoice) {
            returnData = {
                status: false,
                response: "server",
                errors: "Sorry! Our Record doesn't match to your invoice_number",
            };
            return returnData;
        }
        let status;
        let paidAt = undefined;
        if (data.status == "PAID") {
            status = 'paid';
            paidAt = new Date();
            const userHasCourse = await prisma_1.default.userHasCourse.create({
                data: {
                    user_id: invoice.user_id,
                    course_id: invoice.course_id
                }
            });
        }
        else if (data.status == "EXPIRED") {
            status = 'expired';
        }
        else {
            status = 'unpaid';
        }
        const updateInvoice = await prisma_1.default.invoice.update({
            where: {
                id: invoice.id
            },
            data: {
                status,
                paidAt,
                extra_attributes: data
            }
        });
        returnData = {
            status: true,
            response: "success-payment-course",
            message: "Your purchase has been successfully paid.",
        };
        return returnData;
    }
}
exports.default = PaymentService;
//# sourceMappingURL=PaymentService.js.map