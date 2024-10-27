import { Request } from "express";
import { prismaClient } from "../applications/database";
import Validation from "../validations/Validation";
import { 
    createVillageValidation,
    getVillageValidation,
    updateVillageValidation
} from "../validations/village-validation";
import ResponseError from "../errors/ResponseError";
import DistrictService from "./DistrictService";
import { CreateVillageRequest, VillageResponse, toVillageResponse } from "../models/village-model";


class VillageService{
    static index(){
        return prismaClient.village.findMany({});
    }

    static async create(request:CreateVillageRequest):Promise<VillageResponse>{
        const villageRequest=Validation.validate(createVillageValidation, request);
        
        if(!await DistrictService.checkExistsDistrict(villageRequest.district_id)){
            throw new ResponseError(404, "District is not found");
        }

        const village=await prismaClient.village.create({
            data:villageRequest,
            select:{
                id:true,
                district_id:true,
                name:true,
                postal_code:true
            }
        });

        return toVillageResponse(village);
    }


    static async checkExistsVillage(id:number){
        const checkVillage = await prismaClient.village.findFirst({
            where: {
                id,
            },
        });

        return checkVillage !== null;  
    }

    static async get(id:number):Promise<VillageResponse>{
        const districtId=Validation.validate(getVillageValidation, id);

        const village=await prismaClient.village.findFirst({
            where:{
                id:districtId
            },
            select:{
                id:true,
                district_id:true,
                name:true,
                postal_code:true
            }
        })

        if(!village){
            throw new ResponseError(404, "Village is not found");
        }

        return toVillageResponse(village);
    }

    static async update(id:number, request:Request):Promise<VillageResponse>{
        const villageRequest=Validation.validate(updateVillageValidation, request);

        const checkVillage = await prismaClient.village.count({
            where: {
                id
            },
        });

        if (checkVillage == 0) {
            throw new ResponseError(404, "Village is not found!");
        }

        if(!await DistrictService.checkExistsDistrict(villageRequest.district_id)){
            throw new ResponseError(404, "District is not found");
        }

        const village= await prismaClient.village.update({
            where:{
                id
            },
            data:{
                name:villageRequest.name,
                district_id:villageRequest.district_id,
                postal_code:villageRequest.postal_code
            },
            select:{
                id:true,
                district_id:true,
                name:true,
                postal_code:true
            }
        });
        return toVillageResponse(village);
    }

    static async remove(id:number):Promise<VillageResponse>{
       const villageId=Validation.validate(getVillageValidation, id);

        const checkVillage = await prismaClient.village.count({
            where: {
                id:villageId,
            },
        });

        if (checkVillage == 0) {
            throw new ResponseError(404, "Village is not found");
        }

        const village= await prismaClient.village.delete({
            where: {
              id: villageId,
            },
        });

        return toVillageResponse(village);
    } 
}

export default VillageService;