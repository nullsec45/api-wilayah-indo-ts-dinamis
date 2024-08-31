import Joi from "joi";

const createRegencyValidation=Joi.object({
    name:Joi.string().required().min(3),
    province_id:Joi.number().min(1).positive().required()
});

const getRegencyValidation=Joi.number().min(1).positive().required();

const updateRegencyValidation=Joi.object({
    name:Joi.string().required().min(3),
    province_id:Joi.number().min(1).positive()
});

export {
    createRegencyValidation,
    getRegencyValidation,
    updateRegencyValidation
}