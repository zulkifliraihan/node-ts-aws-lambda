import prisma from "../../../config/prisma";
import ServiceType from "../../types/ServiceType";

class PaymentService {
    async main(data: any): Promise<ServiceType> {

        let returnData
        const invoice = await prisma.invoice.findFirst({
            where: {
                invoice_number: data.invoice_number
            }
        })

        if (!invoice) {
            returnData = {
                status: false,
                response: "server",
                errors: "Sorry! Our Record doesn't match to your invoice_number",
            }

            return returnData
        }
        
        let status
        let paidAt = undefined
        if (data.status == "PAID") {
            status = 'paid'
            paidAt = new Date()

            const userHasCourse = await prisma.userHasCourse.create({
                data: {
                    user_id: invoice.user_id,
                    course_id: invoice.course_id
                }
            });
        }
        else if (data.status == "EXPIRED") {
            status = 'expired'
        }
        else {
            status = 'unpaid'
        }

        const updateInvoice = await prisma.invoice.update({
            where: {
                id: invoice.id
            },
            data: {
                status,
                paidAt,
                extra_attributes: data
            }
        })

        returnData = {
            status: true,
            response: "success-payment-course",
            message: "Your purchase has been successfully paid.",
        };
      
        return returnData;
    }
}

export default PaymentService
