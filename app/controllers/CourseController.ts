import { Request, Response } from "express";
import CourseService from "../services/CourseService";
import ReturnResponse from "../traits/ReturnResponse";
import ServiceType from "../types/ServiceType";

class CourseController{
    constructor(private courseService: CourseService) {}

    async getData(req: Request, res: Response): Promise <any> {
        try {
            const courses: ServiceType = await this.courseService.getData()
            
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

    async createData(req: Request, res: Response): Promise <any> {
        try {
            const data   = req.body
            const courses: ServiceType = await this.courseService.createData(data)

            let response;
            if (courses.status) {
              response = ReturnResponse.success(courses.response, courses.data);
            } else {
              if (courses.response == "validation") {
                response = ReturnResponse.errorValidation(courses.errors);
              } else {
                response = ReturnResponse.errorServer(courses.errors, courses.message);
              }
            }
            
            return res.status(response.response_code).json(response);
            
        } catch (error: any) {
            const response = ReturnResponse.errorServer( error.message)
            return res.status(response.response_code).json(response);
        }
        
    } 

    async detailData(req: Request, res: Response): Promise <any> {
      const id: number = parseInt(req.params.id)

      try {
          const courses: ServiceType = await this.courseService.detailData(id)
          
          let response;
          if (courses.status) {
            response = ReturnResponse.success(courses.response, courses.data);
          } 
          else {
            if (courses.response == "validation") {
              response = ReturnResponse.errorValidation(null, courses.message);
            }
            else {
              response = ReturnResponse.errorServer(courses.data);
            }
          }
          return res.status(response.response_code).json(response);
          
      } 
      catch (error: any) {
          const response = ReturnResponse.errorServer( error.message)
          return res.status(response.response_code).json(response);
      }
    } 

    async updateData(req: Request, res: Response): Promise <any> {
      const id: number = parseInt(req.params.id)
      
      try {
          const courses: ServiceType = await this.courseService.updateData(id, req.body)
          
          let response;
          if (courses.status) {
            response = ReturnResponse.success(courses.response, courses.data);
          } 
          else {
            if (courses.response == "validation") {
              response = ReturnResponse.errorValidation(courses.errors, courses.message);
            }
            else {
              response = ReturnResponse.errorServer(courses.data);
            }
          }
          return res.status(response.response_code).json(response);
          
      } 
      catch (error: any) {
          const response = ReturnResponse.errorServer( error.message)
          return res.status(response.response_code).json(response);
      }
    } 

    async deleteData(req: Request, res: Response): Promise <any> {
      const id: number = parseInt(req.params.id)

      try {
          const courses: ServiceType = await this.courseService.deleteData(id)
          
          let response;
          if (courses.status) {
            response = ReturnResponse.success(courses.response, courses.data);
          } 
          else {
            if (courses.response == "validation") {
              response = ReturnResponse.errorValidation(null, courses.message);
            }
            else {
              response = ReturnResponse.errorServer(courses.data);
            }
          }
          return res.status(response.response_code).json(response);
          
      } 
      catch (error: any) {
          const response = ReturnResponse.errorServer(error.message)
          return res.status(response.response_code).json(response);
      }
    } 
}

export default CourseController
