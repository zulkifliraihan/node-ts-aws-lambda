import { Request, Response } from "express";
import PaymentService from "../../services/Webhook/PaymentService";
import ReturnResponse from "../../traits/ReturnResponse";
import ServiceType from "../../types/ServiceType";

class PaymentController{
    constructor(private paymentService: PaymentService) {}

    async test(req: Request, res: Response): Promise <any> {
      return res.status(200).json({
        message: "Success"
      });
    } 
    async main(req: Request, res: Response): Promise <any> {
        try {

            const payments: ServiceType = await this.paymentService.main(req.body)

            let response;
            if (payments.status) {
              response = ReturnResponse.success(null, payments.data, payments.message);
            } else {
                if (payments.response == "validation") {
                  response = ReturnResponse.errorValidation(payments.errors);
                }
                else {
                  response = ReturnResponse.errorServer(payments.errors, payments.message);
                }
            }
            
            return res.status(response.response_code).json(response);
            
        } catch (error: any) {
            const response = ReturnResponse.errorServer(error.message)
            return res.status(response.response_code).json(response);
        }
        
    } 
}

export default PaymentController
