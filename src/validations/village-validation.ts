import Joi from "joi";

const createVillageValidation=Joi.object({
    name:Joi.string().required().min(3),
    district_id:Joi.number().min(1).positive().required(),
    postal_code:Joi.string().required()
});

const getVillageValidation=Joi.number().min(1).positive().required();

const updateVillageValidation=Joi.object({
    name:Joi.string().required().min(3),
    district_id:Joi.number().min(1).positive().required(),
    postal_code:Joi.number().min(1).positive().required()
});

export {
    createVillageValidation,
    getVillageValidation,
    updateVillageValidation
}