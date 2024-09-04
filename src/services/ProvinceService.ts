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
            throw new ResponseError(404, "Province is not found");
        }

        return province;
    }

    static async update(id:number, request:Request){
        const province=Validation.validate(updateProvinceValidation, request);

        const checkProvince = await prismaClient.province.count({
            where: {
                id
            },
        });

        if (checkProvince == 0) {
            throw new ResponseError(404, "Province is not found!");
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

        const checkProvince = await prismaClient.province.count({
            where: {
                id:provinceId,
            },
        });

        if (checkProvince == 0) {
            throw new ResponseError(404, "Province is not found");
        }

        return prismaClient.province.delete({
            where: {
              id: provinceId,
            },
        });
    }

    static async checkExistsProvince(id:number){
        const checkProvince = await prismaClient.province.findFirst({
            where: {
                id,
            },
        });

        return checkProvince !== null;  
    }
}

export default ProvinceService;