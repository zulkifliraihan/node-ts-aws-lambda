"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnResponse_1 = __importDefault(require("../../traits/ReturnResponse"));
class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async test(req, res) {
        return res.status(200).json({
            message: "Success"
        });
    }
    async main(req, res) {
        try {
            const payments = await this.paymentService.main(req.body);
            let response;
            if (payments.status) {
                response = ReturnResponse_1.default.success(null, payments.data, payments.message);
            }
            else {
                if (payments.response == "validation") {
                    response = ReturnResponse_1.default.errorValidation(payments.errors);
                }
                else {
                    response = ReturnResponse_1.default.errorServer(payments.errors, payments.message);
                }
            }
            return res.status(response.response_code).json(response);
        }
        catch (error) {
            const response = ReturnResponse_1.default.errorServer(error.message);
            return res.status(response.response_code).json(response);
        }
    }
}
exports.default = PaymentController;
//# sourceMappingURL=PaymentController.js.map