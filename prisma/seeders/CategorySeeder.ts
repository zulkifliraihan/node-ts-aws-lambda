import prisma from "../../config/prisma";
import { faker } from '@faker-js/faker';

class CategorySeeder {
    async seed() {
        
        try {
            for (let i = 0; i < 10; i++) {

                const data: any = {
                    name: faker.commerce.department(),
                };
            
                const category: any = await prisma.category.create({ data })
            }

            console.log(`✨ ---- Successfully Seed CategorySeeder ---- ✨`)
        } 
        catch (error: any) {
            console.log(`🔥 ---- Failed Seed CategorySeeder ---- 🔥`)
            console.log(error.message)
        } 

    }
}
export default new CategorySeeder()


