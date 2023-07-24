import prisma from "../../config/prisma";

class GeneralHelper {
    async generateInvoiceNumber(type: string)
    {
        const invoice_number = `-CMI-${type}-` + new Date().toISOString().slice(5, 7) + new Date().toISOString().slice(0, 4)

        const last_invoice_number = await prisma.invoice.findFirst({
            where: {
              invoice_number: {
                contains: invoice_number,
              },
            },
            orderBy: {
              invoice_number: 'desc',
            },
        })

        let first_digit_invoice: number;

        if (last_invoice_number) {
            const split_number_invoice = last_invoice_number.invoice_number.split('-');
            first_digit_invoice = parseInt(split_number_invoice[0]) + 1
        } else {
            first_digit_invoice = 1;
        }

        const digit_invoice = first_digit_invoice.toString().padStart(3, '0');

        return digit_invoice + invoice_number;
    }
}

export default new GeneralHelper()
