import Joi from "joi";

const createCategory = Joi.object({
    name: Joi.string().required()
})

const updateCategory = Joi.object({
    name: Joi.string()
})

export default {
    createCategory,
    updateCategory
}
