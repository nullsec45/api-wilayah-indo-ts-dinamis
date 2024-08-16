import Joi from "joi";

const createProvinceValidation=Joi.object({
    name:Joi.string().min(3)
});

export {createProvinceValidation}