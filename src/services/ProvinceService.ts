import { Request } from "express";
import { prismaClient } from "../applications/database";
import Validation from "../validations/Validation";
import { 
    createProvinceValidation, 
    getProvinceValidation 

} from "../validations/province-validation";
import ResponseError from "../errors/ResponseError";

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

    static async get(id:number){
        const provinceId=Validation.validate(getProvinceValidation, id);

        const province=await prismaClient.province.findFirst({
            where:{
                id:provinceId
            },
            select:{
                id:true,
                name:true
            }
        })

        if(!province){
            throw new ResponseError(404, "province not found");
        }

        return province;
    }
}

export default ProvinceService;