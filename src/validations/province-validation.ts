import Joi from "joi";

const createProvinceValidation=Joi.object({
    name:Joi.string().required().min(3)
});

const getProvinceValidation=Joi.number().min(1).positive().required();

const updateProvinceValidation=Joi.object({
    name:Joi.string().required().min(3)
});

export {
    createProvinceValidation,
    getProvinceValidation,
    updateProvinceValidation
}