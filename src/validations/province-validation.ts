import Joi from "joi";

const createProvinceValidation=Joi.object({
    name:Joi.string().min(3)
});

const getProvinceValidation=Joi.number().min(1).positive().required();

export {
    createProvinceValidation,
    getProvinceValidation
}