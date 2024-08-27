import { Request, Response, NextFunction } from "express";
import ProvinceService from "../services/ProvinceService";
import IController from "./ControllerInterface";

class ProvinceController implements IController{
    index= async (req:Request, res:Response, next:NextFunction) => {
        // try{
        //     const result=await ProvinceService.create(req.body);

        //     return result;
        // }catch(error){
        //     next(error);
        // }
        
    }

    create= async (req:Request, res:Response, next:NextFunction) => {
        try{
            const result=await ProvinceService.create(req.body);
            res.status(200).json({
                data: result,
            });
        }catch(error){
            next(error);
        }
        
    }

    show= async (req:Request, res:Response, next:NextFunction) => {
        try{
            const provinceId=parseInt(req.params.id);
            const result=await ProvinceService.get(provinceId);

            res.status(200).json({
                data: result,
            });
        }catch(error){
            next(error);
        }
        
    }

    update= async (req:Request, res:Response, next:NextFunction) => {
        try{
            const id=parseInt(req.params.id);
            const request=req.body;
            const result=await ProvinceService.update(id, request);

            res.status(200).json({
                message:"Update Success",
                data: result,
            });
        }catch(error){
            next(error);
        }
        
    }

    delete= async (req:Request, res:Response, next:NextFunction) => {
        try{
            const provinceId=parseInt(req.params.id);
            await ProvinceService.remove(provinceId);

            res.status(200).json({
                 message: "Delete Success",
            });
        }catch(error){
            next(error);
        }
        
    }
}

export default new ProvinceController();