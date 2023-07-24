import prisma from "../../config/prisma";
import { faker } from '@faker-js/faker';

class StatusCourseSeeder {
    async seed() {
        
        try {
            const status = [
                "Draft", 
                "Ready", 
                "Registration", 
                "Running",
                "Finished",
                "Canceled",
            ];

            for (let i = 0; i < status.length; i++) {
                // const randomIndex = Math.floor(Math.random() * status.length);

                const data: any = {
                    name: status[i],
                };
            
                const statusCourse: any = await prisma.statusCourse.create({ data })
            }

            console.log(`✨ ---- Successfully Seed StatusCourseSeeder ---- ✨`)
        } 
        catch (error: any) {
            console.log(`🔥 ---- Failed Seed StatusCourseSeeder ---- 🔥`)
            console.log(error.message)
        } 

    }
}
export default new StatusCourseSeeder()





