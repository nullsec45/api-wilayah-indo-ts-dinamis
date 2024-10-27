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
import { CreateDistrictRequest, DistrictResponse, toDistrictResponse } from "../models/district-model";

class DistrictService{
    static index(){
        return prismaClient.district.findMany({});
    }

    static async create(request:CreateDistrictRequest):Promise<DistrictResponse>{
        const districtRequest=Validation.validate(createDistrictValidation, request);

        
        if(!await RegencyService.checkExistsRegency(districtRequest.regency_id)){
            throw new ResponseError(404, "Regency is not found");
        }

        const district=  await prismaClient.district.create({
            data:districtRequest,
            select:{
                id:true,
                regency_id:true,
                name:true
            }
        });

        return toDistrictResponse(district);
    }

    static async checkExistsDistrict(id:number){
        const checkDistrict = await prismaClient.district.findFirst({
            where: {
                id,
            },
        });

        return checkDistrict !== null;  
    }

    static async get(id:number):Promise<DistrictResponse>{
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

        return toDistrictResponse(district);
    }

    static async update(id:number, request:Request){
        const districtRequest=Validation.validate(updateDistrictValidation, request);

        if(!await RegencyService.checkExistsRegency(districtRequest.regency_id)){
            throw new ResponseError(404, "Regency is not found");
        }

        const checkDistrict = await DistrictService.checkExistsDistrict(id);

        if (!checkDistrict) {
            throw new ResponseError(404, "District is not found!");
        }

        const district= await prismaClient.district.update({
            where:{
                id
            },
            data:{
                regency_id:districtRequest.regency_id,
                name:districtRequest.name,
            },
            select:{
                id:true,
                regency_id:true,
                name:true
            }
        });

        return toDistrictResponse(district);
    }

    static async remove(id:number):Promise<DistrictResponse>{
       const regencyId=Validation.validate(getDistrictValidation, id);
    
       const checkDistrict = await DistrictService.checkExistsDistrict(regencyId);

        if (!checkDistrict) {
            throw new ResponseError(404, "District is not found");
        }

        const district=await prismaClient.district.delete({
            where: {
              id: regencyId,
            },
        });

        return toDistrictResponse(district);
    }
}

export default DistrictService;