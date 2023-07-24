import prisma from "../../config/prisma";
import GeneralHelper from "../helpers/GeneralHelper";
import SecurityHelper from "../helpers/SecurityHelper";
import CourseInterface from "../repository/CourseRepository/CourseInterface";
import UserInterface from "../repository/UserRepository/UserInterface";
import ServiceType from "../types/ServiceType";
import PublicValidation from "../validation/PublicValidation";

const securityHelper = new SecurityHelper()
class PublicService {
    constructor(
        private userRepository: UserInterface,
        private courseRepository: CourseInterface,

    ) {}
    
    public async updateProfile(id: number, data: any): Promise<ServiceType> 
    {

        const { error } = PublicValidation.updateProfile.validate(data, {abortEarly: false})

        let returnData
        if (error) {
            const errors = error.details.map((err: any) => err.message);

            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };

            return returnData
        }
        const checkUser = await this.userRepository.detailData(id)
        
        if (!checkUser) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID User Not Found",
                errors: null
            };
            return returnData
        }

        if (data.email) {
            const findUserByEmail = await this.userRepository.checkEmailData(data.email)

            if (findUserByEmail && findUserByEmail.id !== id) {
            
                if (findUserByEmail.deletedAt === null) {
                    returnData = {
                        status: false,
                        response: "validation",
                        message: "Email is already in use",
                    };
                }
                else {
                    returnData = {
                        status: false,
                        response: "server",
                        message: "The email you provided has already been deleted and cannot be used for new data creation",
                    }
                }
    
                return returnData
            }
        }

        if (data.gender !== 'male' && data.gender !== 'female') {
            returnData = {
                status: false,
                response: "validation",
                errors: "Invalid gender: It must be either male or female.",
            };

            return returnData
        }


        let password
        
        if (data.password) {
            password = new SecurityHelper().hashPassword(data.password)
        }

        const dataUser: object = {
            email: data.email,
            password: password,
            profiles: {
                upsert: {
                    create: {
                        firstName: data.first_name,
                        lastName: data.last_name,
                        gender: data.gender
                    },
                    update: {
                        firstName: data.first_name ?? undefined,
                        lastName: data.last_name ?? undefined,
                        gender: data.gender ?? undefined,
                    }
                }
            }
        }

        const user = await this.userRepository.updateData(id, dataUser)

        returnData = {
            status: true,
            response: "updated",
            data: user,
        };
      
        return returnData;
    }

    async allCourse(): Promise<ServiceType> {
      const courses = await this.courseRepository.getDataReady()
  
      const returnData: ServiceType = {
          status: true,
          response: "get",
          data: courses,
      };
    
      return returnData
    }

    async enrollCourse(course_id: number, currentUser: any): Promise<ServiceType> {
        let returnData: any = {}

        const checkCourse = await this.courseRepository.detailData(course_id)
        
        if (!checkCourse) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Course Not Found",
                errors: null
            };
            return returnData
        }    
        
        const invoice_number: string = await GeneralHelper.generateInvoiceNumber('ECRS')

        const total_payment = checkCourse.price - checkCourse.discount

        let expiredAt
        let paidAt

        console.log(checkCourse.type_course)
        if (checkCourse.type_course == "free") {
            expiredAt = new Date()
            paidAt = new Date()
            
            const userHasCourse = await prisma.userHasCourse.create({
                data: {
                user_id: currentUser.id,
                course_id: checkCourse.id
                }
            })

            returnData.status = true;
            returnData.response = "success-enroll-course";
            returnData.message = "Successfully Enroll Free Course";

        } 
        else {
            expiredAt = new Date(new Date());
            expiredAt.setDate(expiredAt.getDate() + 1)

            paidAt = undefined

            returnData.status = true;
            returnData.response = "success-purchase-course";
            returnData.message = "Your purchase is successful. Please proceed to payment!";

        }

        const invoice = await prisma.invoice.create({
            data: {
                user_id: currentUser.id,
                course_id: checkCourse.id,
                invoice_number,
                status: 'unpaid',
                total_payment,
                paidAt,
                expiredAt
            }
        })

        returnData.data = invoice
        
        return returnData
    }

}




export default PublicService
