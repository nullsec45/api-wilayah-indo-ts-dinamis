import { Request } from "express";
import { prismaClient } from "../applications/database";
import Validation from "../validations/Validation";
import { createProvinceValidation } from "../validations/province-validation";

class ProvinceService{
    static create(request:Request){
        const province=Validation.validate(createProvinceValidation, request);

        return prismaClient.province.create({
            data:province,
            select:{
                id:true,
                name:true
            }
        })
    }
}

export default ProvinceService;