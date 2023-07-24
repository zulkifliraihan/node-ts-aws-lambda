import prisma from "../../../config/prisma";
import CourseInterface from "./CourseInterface";

class CourseRepository implements CourseInterface{
    async getData(): Promise<object[]> {

        const courses = await prisma.course.findMany({
            include: {
                categories: true,
                status: true,
                instructor: {
                    include: {
                        profiles: true
                    }
                },
            },
        })
        
        return courses
    }

    async createData(data: any): Promise<object> {

        const courses = await prisma.course.create({
            data,
            include: {
                categories: true,
                status: true,
                instructor: {
                    include: {
                        profiles: true
                    }
                },
            },
        })

        return courses
    }

    async detailData(id: number): Promise<any> {

        const courses = await prisma.course.findUnique({
            where: {
                id: id
            },
            include: {
                categories: true,
                status: true,
                instructor: {
                    include: {
                        profiles: true
                    }
                },
            },
        })
        
        return courses
    }

    async updateData(id: number,    data: any): Promise<object> {

        const courses = await prisma.course.update({
            where: {
                id
            },
            data,
            include: {
                categories: true,
                status: true,
                instructor: {
                    include: {
                        profiles: true
                    }
                },
            },
        })
        
        return courses
    }

    async deleteData(id: number, include: object | null): Promise<any> {

        const courses = await prisma.course.delete({
            where: {
                id: id
            },
            include
        })
        
        return courses
    }

    async getDataReady(): Promise<object[]> {

        const courses = await prisma.course.findMany({
            where: {
                status_id: 2
            },
            include: {
                categories: true,
                status: true,
                instructor: {
                    include: {
                        profiles: true
                    }
                },
            },
        })
        
        return courses
    }
}

export default CourseRepository
