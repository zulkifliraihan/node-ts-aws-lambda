import CategoryInterface from "../repository/CategoryRepository/CategoryInterface";
import ServiceType from "../types/ServiceType";
import CategoryValidation from '../validation/CategoryValidation';

class CategoryService {
    constructor(
        private categoryRepository: CategoryInterface,
    ) {}

    async getData(): Promise<ServiceType> {
        const categories = await this.categoryRepository.getData()
    
        const returnData: ServiceType = {
            status: true,
            response: "get",
            data: categories,
        };
      
          return returnData;
    }

    async createData(data: any): Promise<ServiceType> {

        let returnData
        const { error } = CategoryValidation.createCategory.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err: any) => err.message);

            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };

            return returnData
        }

        const dataCategory: object = {
            name: data.name
        }

        const category = await this.categoryRepository.createData(dataCategory)

        returnData = {
            status: true,
            response: "created",
            data: category,
        };
      
        return returnData;
    }

    async detailData(id: number): Promise<ServiceType> {
        const categories = await this.categoryRepository.detailData(id)

        let returnData
        if (categories) {
            returnData = {
                status: true,
                response: "get",
                data: categories,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Category Not Found",
            };
        }
      
        return returnData;
    }

    async updateData(id: number, data: any): Promise<ServiceType> {

        const { error } = CategoryValidation.updateCategory.validate(data, {abortEarly: false})

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
        const checkCategory = await this.categoryRepository.detailData(id)
        
        if (!checkCategory) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Category Not Found",
                errors: null
            };
            return returnData
        }

        const dataCategory: object = {
            name: data.name ?? undefined
        }

        const category = await this.categoryRepository.updateData(id, dataCategory)

        returnData = {
            status: true,
            response: "updated",
            data: category,
        };
      
        return returnData;
    }

    async deleteData(id: number): Promise<ServiceType> {
        const checkCategory = await this.categoryRepository.detailData(id)
        
        let returnData
        if (!checkCategory) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Category Not Found",
                errors: null
            };
            return returnData
        }

        const categories = await this.categoryRepository.deleteData(id)

        if (categories) {
            returnData = {
                status: true,
                response: "deleted",
                data: categories,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Category Not Found",
            };
        }
      
        return returnData;
    }
}

export default CategoryService
