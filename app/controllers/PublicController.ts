import { Request, Response } from "express";
import PublicService from "../services/PublicService";
import ServiceType from "../types/ServiceType";
import ReturnResponse from "../traits/ReturnResponse";

class PublicController {
    constructor(private publicService: PublicService) {}

    async updateProfile(req: Request, res: Response): Promise <any> {
      const currentUser: any = req.session.currentUser
      const id: number = parseInt(currentUser.id)
      
      try {
          const publicService: ServiceType = await this.publicService.updateProfile(id, req.body)
          
          let response;
          if (publicService.status) {
            response = ReturnResponse.success(publicService.response, publicService.data);
          } 
          else {
            if (publicService.response == "validation") {
              response = ReturnResponse.errorValidation(publicService.errors, publicService.message);
            }
            else {
              response = ReturnResponse.errorServer(publicService.data);
            }
          }
          return res.status(response.response_code).json(response);
          
      } 
      catch (error: any) {
          const response = ReturnResponse.errorServer( error.message)
          return res.status(response.response_code).json(response);
      }
    }

    async allCourse(req: Request, res: Response): Promise <any> {
        try {
          
            const courses: ServiceType = await this.publicService.allCourse()
            
            let response;
            if (courses.status) {
              response = ReturnResponse.success(courses.response, courses.data);
            } else {
              response = ReturnResponse.errorServer(courses.data);
            }
            
            return res.status(response.response_code).json(response);
            
        } catch (error: any) {
            const response = ReturnResponse.errorServer( error.message)
            return res.status(response.response_code).json(response);
        }
    } 

    async enrollCourse(req: Request, res: Response): Promise <any> {
        const course_id: number = parseInt(req.params.courseId)

        try {
            const currentUser: any = req.session.currentUser

            const courses: ServiceType = await this.publicService.enrollCourse(course_id, currentUser)
            
            let response;
            if (courses.status) {
              response = ReturnResponse.success(null, courses.data, courses.message);
            } else {
              if (courses.response == "validation") {
                response = ReturnResponse.errorValidation(courses.errors);
              }
              else {
                response = ReturnResponse.errorServer(courses.data);
              }
            }
            
            return res.status(response.response_code).json(response);
            
        } catch (error: any) {
            console.log(error)
            const response = ReturnResponse.errorServer( error.message)
            return res.status(response.response_code).json(response);
        }
    } 
}

export default PublicController
