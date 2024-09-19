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
import { logger } from "../applications/logging";


class VillageService{
    static index(){
        return prismaClient.village.findMany({});
    }

    static async create(request:Request){
        const village=Validation.validate(createVillageValidation, request);
        
        if(!await DistrictService.checkExistsDistrict(village.district_id)){
            throw new ResponseError(404, "District is not found");
        }

        return prismaClient.village.create({
            data:village,
            select:{
                id:true,
                district_id:true,
                name:true,
                postal_code:true
            }
        })
    }

    static async get(id:number){
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

        return village;
    }

    static async update(id:number, request:Request){
        const village=Validation.validate(updateVillageValidation, request);

        const checkVillage = await prismaClient.village.count({
            where: {
                id
            },
        });

        if (checkVillage == 0) {
            throw new ResponseError(404, "Village is not found!");
        }

        if(!await DistrictService.checkExistsDistrict(village.district_id)){
            throw new ResponseError(404, "District is not found");
        }

        return prismaClient.village.update({
            where:{
                id
            },
            data:{
                name:village.name,
                district_id:village.district_id,
                postal_code:village.postal_code
            },
            select:{
                id:true,
                district_id:true,
                name:true,
                postal_code:true
            }
        });
    }

    static async remove(id:number){
       const villageId=Validation.validate(getVillageValidation, id);

        const checkVillage = await prismaClient.village.count({
            where: {
                id:villageId,
            },
        });

        if (checkVillage == 0) {
            throw new ResponseError(404, "Village is not found");
        }

        return prismaClient.village.delete({
            where: {
              id: villageId,
            },
        });
    }   


    static async checkExistsVillage(id:number){
        const checkVillage = await prismaClient.village.findFirst({
            where: {
                id,
            },
        });

        return checkVillage !== null;  
    }
}

export default VillageService;