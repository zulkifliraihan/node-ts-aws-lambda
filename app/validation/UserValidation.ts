import Joi from "joi";

const createUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    gender: Joi.string().required(),
    
})

const updateUser = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(8),
    first_name: Joi.string(),
    last_name: Joi.string(),
    gender: Joi.string()
})

export default {
    createUser,
    updateUser,
}
