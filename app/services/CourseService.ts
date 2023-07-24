import CourseInterface from "../repository/CourseRepository/CourseInterface";
import ServiceType from "../types/ServiceType";
import CourseValidation from '../validation/CourseValidation';

class CourseService {
    constructor(
        private courseRepository: CourseInterface,
    ) {}

    async getData(): Promise<ServiceType> {
        const courses = await this.courseRepository.getData()
    
        const returnData: ServiceType = {
            status: true,
            response: "get",
            data: courses,
        };
      
          return returnData;
    }

    async createData(data: any): Promise<ServiceType> {

        let returnData
        const { error } = CourseValidation.createCourse.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };

            return returnData
        }

        if (data.type_course !== 'free' && data.type_course !== 'paid') {
            returnData = {
                status: false,
                response: "validation",
                errors: "Invalid type_course: It must be either free or paid.",
            };

            return returnData
        }

        const { start_register, finish_register, start_course, finish_course }: any = data

        if (start_register >= finish_register) {
            returnData = {
                status: false,
                response: "validation",
                errors: "Invalid registration period: Start registration cannot be after finish registration.",
            };

            return returnData
        }

        if (start_course >= finish_course) {
            returnData = {
                status: false,
                response: "validation",
                errors: "Invalid course period: Start course date cannot be after finish course date.",
            };

            return returnData
        }

        if (start_register >= start_course) {
            returnData = {
                status: false,
                response: "validation",
                errors: "Invalid course schedule: Start register date cannot be after start course date.",
            };

            return returnData
        }

        const dataCourse: object = {
            instructor_id: data.instructor_id,
            status_id: data.status_id,
            type_course: data.type_course,
            name: data.name,
            description: data.description,
            quota: data.quota,
            price: data.price,
            discount: data.discount,
            start_register: new Date(data.start_register),
            finish_register: finish_register ? new Date(data.finish_register) : null,
            start_course: new Date(data.start_course),
            finish_course: new Date(data.finish_course),
            categories: {
                connect: data.category_id.map((id: number) => ({ id })),
            },
        }

        const course = await this.courseRepository.createData(dataCourse)

        returnData = {
            status: true,
            response: "created",
            data: course,
        };
      
        return returnData;
    }

    async detailData(id: number): Promise<ServiceType> {
        const courses = await this.courseRepository.detailData(id)

        let returnData
        if (courses) {
            returnData = {
                status: true,
                response: "get",
                data: courses,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Course Not Found",
            };
        }
      
        return returnData;
    }

    async updateData(id: number, data: any): Promise<ServiceType> {

        const { error } = CourseValidation.updateCourse.validate(data, {abortEarly: false})

        let returnData
        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };

            return returnData
        }
        const checkCourse = await this.courseRepository.detailData(id)
        
        if (!checkCourse) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Course Not Found",
                errors: null
            };
            return returnData
        }

        if (data.type_course) {
            if (data.type_course !== 'free' && data.type_course !== 'paid') {
                returnData = {
                    status: false,
                    response: "validation",
                    errors: "Invalid type_course: It must be either free or paid.",
                };
    
                return returnData
            }
        }

        // START : VALIDATION DATE REGISTER
        if (data.start_register && data.finish_register) {
            if (data.start_register >= data.finish_register) {
                returnData = {
                    status: false,
                    response: "validation",
                    errors: "Invalid registration period: Start registration cannot be after finish registration.",
                };
    
                return returnData
            }
        }

        if (data.start_register) {
            const formattedStartRegister = new Date(data.start_register)
            
            if (formattedStartRegister >= checkCourse.finish_register) {
                returnData = {
                    status: false,
                    response: "validation",
                    errors: "Invalid registration period: Start registration cannot be after finish registration from previous data.",
                };
    
                return returnData
            }
        }

        if (data.finish_register) {
            const formattedFinishRegister = new Date(data.finish_register)

            if (formattedFinishRegister <= checkCourse.start_register) {
                returnData = {
                    status: false,
                    response: "validation",
                    errors: "Invalid registration period: Finish registration cannot be before start registration from previous data.",
                };
    
                return returnData
            }
        }
        // END : VALIDATION DATE REGISTER

        // START : VALIDATION DATE COURSE
        if (data.start_course && data.finish_course) {
            if (data.start_course >= data.finish_course) {
                returnData = {
                    status: false,
                    response: "validation",
                    errors: "Invalid course period: Start course date cannot be after finish course date.",
                };

                return returnData
            }
        }

        if (data.start_course) {
            const formattedStartCourse = new Date(data.start_course)

            if (formattedStartCourse >= checkCourse.finish_course) {
                returnData = {
                    status: false,
                    response: "validation",
                    errors: "Invalid course period: Start course date cannot be after finish course date from previous data.",
                };
    
                return returnData
            }
        }

        if (data.finish_course) {
            const formattedFinishCourse = new Date(data.finish_course)

            if (formattedFinishCourse >= checkCourse.start_course) {
                returnData = {
                    status: false,
                    response: "validation",
                    errors: "Invalid course period: Finish course date cannot be after start course date from previous data.",
                };
    
                return returnData
            }
        }
        // END : VALIDATION DATE COURSE

        if (data.start_register && data.start_course) {
            if (data.start_register >= data.start_course) {
                returnData = {
                    status: false,
                    response: "validation",
                    errors: "Invalid course schedule: Start register date cannot be after start course date.",
                };

                return returnData
            }
        }

        const dataCourse: object = {
            instructor_id: data.instructor_id ?? undefined,
            status_id: data.status_id ?? undefined,
            type_course: data.type_course ?? undefined,
            name: data.name ?? undefined,
            description: data.description ?? undefined,
            quota: data.quota ?? undefined,
            price: data.price ?? undefined,
            discount: data.discount ?? undefined,
            start_register: data.start_register ? new Date(data.start_register) : undefined,
            finish_register: data.finish_register ? new Date(data.finish_register) : undefined,
            start_course: data.start_course ? new Date(data.start_course) : undefined,
            finish_course: data.finish_course ? new Date(data.finish_course) : undefined,
            categories: data.category_id ? {
                set: data.category_id.map((id: number) => ({ id })),
            } : undefined
        }

        const course = await this.courseRepository.updateData(id, dataCourse)

        returnData = {
            status: true,
            response: "updated",
            data: course,
        };
      
        return returnData;
    }

    async deleteData(id: number): Promise<ServiceType> {
        const checkCourse = await this.courseRepository.detailData(id)
        
        let returnData
        if (!checkCourse) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Course Not Found",
                errors: null
            };
            return returnData
        }

        const include = {
            include: {
                categories: true,
            }
        }

        const courses = await this.courseRepository.deleteData(id, include.include)

        if (courses) {
            returnData = {
                status: true,
                response: "deleted",
                data: courses,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Course Not Found",
            };
        }
      
        return returnData;
    }
}

export default CourseService
