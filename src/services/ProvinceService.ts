import { Request } from "express";
import { prismaClient } from "../applications/database";
import Validation from "../validations/Validation";
import { 
    createProvinceValidation, 
    getProvinceValidation,
    updateProvinceValidation 

} from "../validations/province-validation";
import ResponseError from "../errors/ResponseError";

class ProvinceService{
    static index(){
        return prismaClient.province.findMany({});
    }

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

    static async update(id:number, request:Request){
        const province=Validation.validate(updateProvinceValidation, request);

        const checkContact = await prismaClient.province.count({
            where: {
                id
            },
        });

        if (checkContact == 0) {
            throw new ResponseError(404, "Contact is not found!");
        }

        return prismaClient.province.update({
            where:{
                id
            },
            data:{
                name:province.name
            },
            select:{
                id:true,
                name:true
            }
        });
    }

    static async remove(id:number){
       const provinceId =Validation.validate(getProvinceValidation, id);

        const checkContact = await prismaClient.province.count({
            where: {
                id:provinceId,
            },
        });

        if (checkContact == 0) {
            throw new ResponseError(404, "contact is not found");
        }

        return prismaClient.province.delete({
            where: {
              id: provinceId,
            },
        });
    }
}

export default ProvinceService;