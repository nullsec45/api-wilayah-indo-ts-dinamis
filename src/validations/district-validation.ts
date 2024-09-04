import Joi from "joi";

const createDistrictValidation=Joi.object({
    name:Joi.string().required().min(3),
    regency_id:Joi.number().min(1).positive().required()
});

const getDistrictValidation=Joi.number().min(1).positive().required();

const updateDistrictValidation=Joi.object({
    name:Joi.string().required().min(3),
    regency_id:Joi.number().min(1).positive()
});

export {
    createDistrictValidation,
    getDistrictValidation,
    updateDistrictValidation
}