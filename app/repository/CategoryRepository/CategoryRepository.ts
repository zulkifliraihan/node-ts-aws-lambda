import prisma from "../../../config/prisma";
import CategoryInterface from "./CategoryInterface";

class CategoryRepository implements CategoryInterface{
    async getData(): Promise<object[]> {

        const categories = await prisma.category.findMany()
        
        return categories
    }

    async createData(data: any): Promise<object> {

        const category = await prisma.category.create({
            data
        })

        return category
    }

    async detailData(id: number): Promise<any> {

        const category = await prisma.category.findUnique({
            where: {
                id: id
            }
        })
        
        return category
    }

    async updateData(id: number,    data: any): Promise<object> {

        const category = await prisma.category.update({
            where: {
                id
            },
            data
        })
        
        return category
    }

    async deleteData(id: number): Promise<any> {

        const category = await prisma.category.delete({
            where: {
                id: id
            }
        })
        
        return category
    }

}

export default CategoryRepository
