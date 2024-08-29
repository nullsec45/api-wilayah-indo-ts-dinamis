import { Request } from "express";
import { prismaClient } from "../applications/database";
import Validation from "../validations/Validation";
import { 
    createRegencyValidation, 
    getRegencyValidation,
    updateRegencyValidation 
} from "../validations/regency-validation";
import ResponseError from "../errors/ResponseError";

class RegencyService{
    static index(){
        return prismaClient.regency.findMany({});
    }

    static create(request:Request){
        const regency=Validation.validate(createRegencyValidation, request);

        return prismaClient.regency.create({
            data:regency,
            select:{
                id:true,
                province_id:true,
                name:true
            }
        })
    }

    static async get(id:number){
        const regencyId=Validation.validate(getRegencyValidation, id);

        const regency=await prismaClient.regency.findFirst({
            where:{
                id:regencyId
            },
            select:{
                id:true,
                province_id:true,
                name:true
            }
        })

        if(!regency){
            throw new ResponseError(404, "Regency is not found");
        }

        return regency;
    }

    static async update(id:number, request:Request){
        const regency=Validation.validate(updateRegencyValidation, request);

        const checkRegency = await prismaClient.regency.count({
            where: {
                id
            },
        });

        if (checkRegency == 0) {
            throw new ResponseError(404, "Regency is not found!");
        }

        return prismaClient.regency.update({
            where:{
                id
            },
            data:{
                name:regency.name
            },
            select:{
                id:true,
                province_id:true,
                name:true
            }
        });
    }

    static async remove(id:number){
       const regencyId=Validation.validate(getRegencyValidation, id);

        const checkRegency = await prismaClient.regency.count({
            where: {
                id:regencyId,
            },
        });

        if (checkRegency == 0) {
            throw new ResponseError(404, "Regency is not found");
        }

        return prismaClient.regency.delete({
            where: {
              id: regencyId,
            },
        });
    }
}

export default RegencyService;