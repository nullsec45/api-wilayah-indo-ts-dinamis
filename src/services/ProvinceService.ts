import { Request } from "express";
import { prismaClient } from "../applications/database";
import Validation from "../validations/Validation";
import { 
    createProvinceValidation, 
    getProvinceValidation,
    updateProvinceValidation 

} from "../validations/province-validation";
import ResponseError from "../errors/ResponseError";
import { CreateProvinceRequest, ProvinceResponse, toProvinceResponse, UpdateProvinceRequest } from "../models/province-model";

class ProvinceService{
    static index(){
        return prismaClient.province.findMany({});
    }

    static async create(request:CreateProvinceRequest):Promise<ProvinceResponse>{
        const provinceRequest=Validation.validate(createProvinceValidation, request);

        const province= await prismaClient.province.create({
            data:provinceRequest,
            select:{
                id:true,
                name:true
            }
        });

        return toProvinceResponse(province);
    }


    static async checkExistsProvince(id:number){
        const checkProvince = await prismaClient.province.findFirst({
            where: {
                id,
            },
        });

        return checkProvince !== null;  
    }


    static async get(id:number):Promise<ProvinceResponse>{
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

        return toProvinceResponse(province);
    }

    static async update(id:number, request:UpdateProvinceRequest):Promise<ProvinceResponse>{
        const provinceRequest=Validation.validate(updateProvinceValidation, request);

        const checkProvince = await ProvinceService.checkExistsProvince(provinceRequest.id);

        if (!checkProvince) {
            throw new ResponseError(404, "Province is not found!");
        }

        const province= await prismaClient.province.update({
            where:{
                id
            },
            data:{
                name:provinceRequest.name
            },
            select:{
                id:true,
                name:true
            }
        });

        return toProvinceResponse(province);
    }

    static async remove(id:number):Promise<ProvinceResponse>{
       const provinceId =Validation.validate(getProvinceValidation, id);

        const checkProvince =await ProvinceService.checkExistsProvince(provinceId);

        console.log(checkProvince);

        if (!checkProvince) {
            console.log("kontol");
            throw new ResponseError(404, "Province is not found");
        }

        const province= await prismaClient.province.delete({
            where: {
              id: provinceId,
            },
        });

        return toProvinceResponse(province);
    }

}

export default ProvinceService;