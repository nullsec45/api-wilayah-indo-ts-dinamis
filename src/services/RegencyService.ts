import { Request } from "express";
import { prismaClient } from "../applications/database";
import Validation from "../validations/Validation";
import { 
    createRegencyValidation, 
    getRegencyValidation,
    updateRegencyValidation 
} from "../validations/regency-validation";
import ResponseError from "../errors/ResponseError";
import ProvinceService from "./ProvinceService";
import { CreateRegencyRequest, RegencyResponse, toRegencyResponse, UpdateRegencyRequest } from "../models/regency-model";

class RegencyService{
    static index(){
        return prismaClient.regency.findMany({});
    }

    static async create(request:CreateRegencyRequest):Promise<RegencyResponse>{
        const regencyRequest=Validation.validate(createRegencyValidation, request);

        
        if(!await ProvinceService.checkExistsProvince(regencyRequest.province_id)){
            throw new ResponseError(404, "Province is not found");
        }

        const regency=await prismaClient.regency.create({
            data:regencyRequest,
            select:{
                id:true,
                province_id:true,
                name:true
            }
        })

        return toRegencyResponse(regency);
    }

     static async checkExistsRegency(id:number){
        const checkRegency = await prismaClient.regency.findFirst({
            where: {
                id,
            },
        });

        return checkRegency !== null;  
    }

    static async get(id:number):Promise<RegencyResponse>{
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

        return toRegencyResponse(regency);
    }

    static async update(id:number, request:UpdateRegencyRequest){
        const regencyRequest=Validation.validate(updateRegencyValidation, request);

        if(!await ProvinceService.checkExistsProvince(regencyRequest.province_id)){
            throw new ResponseError(404, "Province is not found");
        }

        const checkRegency = await RegencyService.checkExistsRegency(id);
        
        if (!checkRegency) {
            throw new ResponseError(404, "Regency is not found!");
        }

        const regency= await prismaClient.regency.update({
            where:{
                id
            },
            data:{
                name:regencyRequest.name,
                province_id:regencyRequest.province_id
            },
            select:{
                id:true,
                province_id:true,
                name:true
            }
        });

        return toRegencyResponse(regency);
    }

    static async remove(id:number):Promise<RegencyResponse>{
       const regencyId=Validation.validate(getRegencyValidation, id);

        const checkRegency = await RegencyService.checkExistsRegency(regencyId);

        if (!checkRegency) {
            throw new ResponseError(404, "Regency is not found");
        }

        const regency= await prismaClient.regency.delete({
            where: {
              id: regencyId,
            },
        });

        return toRegencyResponse(regency);
    }   
}

export default RegencyService;