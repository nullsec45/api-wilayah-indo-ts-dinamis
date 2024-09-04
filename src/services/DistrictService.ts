import { Request } from "express";
import { prismaClient } from "../applications/database";
import Validation from "../validations/Validation";
import { 
    createDistrictValidation, 
    getDistrictValidation,
    updateDistrictValidation 
} from "../validations/district-validation";
import ResponseError from "../errors/ResponseError";
import RegencyService from "./RegencyService";

class DistrictService{
    static index(){
        return prismaClient.district.findMany({});
    }

    static async create(request:Request){
        const district=Validation.validate(createDistrictValidation, request);

        
        if(!await RegencyService.checkExistsRegency(district.regency_id)){
            throw new ResponseError(404, "Province is not found");
        }

        return prismaClient.district.create({
            data:district,
            select:{
                id:true,
                regency_id:true,
                name:true
            }
        })
    }

    static async get(id:number){
        const regencyId=Validation.validate(getDistrictValidation, id);

        const district=await prismaClient.district.findFirst({
            where:{
                id:regencyId
            },
            select:{
                id:true,
                regency_id:true,
                name:true
            }
        })

        if(!district){
            throw new ResponseError(404, "District is not found");
        }

        return district;
    }

    static async update(id:number, request:Request){
        const district=Validation.validate(updateDistrictValidation, request);

        const checkRegency = await prismaClient.district.count({
            where: {
                id
            },
        });

        if (checkRegency == 0) {
            throw new ResponseError(404, "Regency is not found!");
        }

        if(!await RegencyService.checkExistsRegency(district.regency_id)){
            throw new ResponseError(404, "Regency is not found");
        }

        return prismaClient.district.update({
            where:{
                id
            },
            data:{
                name:district.name
            },
            select:{
                id:true,
                regency_id:true,
                name:true
            }
        });
    }

    static async remove(id:number){
       const regencyId=Validation.validate(getDistrictValidation, id);

        const checkRegency = await prismaClient.district.count({
            where: {
                id:regencyId,
            },
        });

        if (checkRegency == 0) {
            throw new ResponseError(404, "District is not found");
        }

        return prismaClient.district.delete({
            where: {
              id: regencyId,
            },
        });
    }   
}

export default DistrictService;