import { Request, Response } from "express";
import CategoryService from "../services/CategoryService";
import ReturnResponse from "../traits/ReturnResponse";
import ServiceType from "../types/ServiceType";

class CategoryController{
    constructor(private categoryService: CategoryService) {}

    async getData(req: Request, res: Response): Promise <any> {
        try {
            const categories: ServiceType = await this.categoryService.getData()
            
            let response;
            if (categories.status) {
              response = ReturnResponse.success(categories.response, categories.data);
            } else {
              response = ReturnResponse.errorServer(categories.data);
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
            const categories: ServiceType = await this.categoryService.createData(data)

            let response;
            if (categories.status) {
              response = ReturnResponse.success(categories.response, categories.data);
            } else {
              if (categories.response == "validation") {
                response = ReturnResponse.errorValidation(categories.errors);
              } else {
                response = ReturnResponse.errorServer(categories.errors, categories.message);
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
          const categories: ServiceType = await this.categoryService.detailData(id)
          
          let response;
          if (categories.status) {
            response = ReturnResponse.success(categories.response, categories.data);
          } 
          else {
            if (categories.response == "validation") {
              response = ReturnResponse.errorValidation(null, categories.message);
            }
            else {
              response = ReturnResponse.errorServer(categories.data);
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
          const categories: ServiceType = await this.categoryService.updateData(id, req.body)
          
          let response;
          if (categories.status) {
            response = ReturnResponse.success(categories.response, categories.data);
          } 
          else {
            if (categories.response == "validation") {
              response = ReturnResponse.errorValidation(categories.errors, categories.message);
            }
            else {
              response = ReturnResponse.errorServer(categories.data);
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
          const categories: ServiceType = await this.categoryService.deleteData(id)
          
          let response;
          if (categories.status) {
            response = ReturnResponse.success(categories.response, categories.data);
          } 
          else {
            if (categories.response == "validation") {
              response = ReturnResponse.errorValidation(null, categories.message);
            }
            else {
              response = ReturnResponse.errorServer(categories.data);
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

export default CategoryController
