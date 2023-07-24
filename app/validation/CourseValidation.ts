import Joi from "joi";

const createCourse = Joi.object({
    category_id: Joi.array().required(),
    instructor_id: Joi.number().required(),
    status_id: Joi.number().required(),
    type_course: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    quota: Joi.number().required(),
    price: Joi.number().required(),
    discount: Joi.number().required(),
    start_register: Joi.date().required(),
    finish_register: Joi.date(),
    start_course: Joi.date().required(),
    finish_course: Joi.date().required(),
})

const updateCourse = Joi.object({
    category_id: Joi.array(),
    instructor_id: Joi.number(),
    status_id: Joi.number(),
    type_course: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    quota: Joi.number(),
    price: Joi.number(),
    discount: Joi.number(),
    start_register: Joi.date(),
    finish_register: Joi.date(),
    start_course: Joi.date(),
    finish_course: Joi.date(),
})

export default {
    createCourse,
    updateCourse
}
