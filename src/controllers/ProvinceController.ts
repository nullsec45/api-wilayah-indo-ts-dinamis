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
        // try{
        //     const result=await ProvinceService.create(req.body);

        //     return result;
        // }catch(error){
        //     next(error);
        // }
        
    }

    update= async (req:Request, res:Response, next:NextFunction) => {
        // try{
        //     const result=await ProvinceService.create(req.body);

        //     return result;
        // }catch(error){
        //     next(error);
        // }
        
    }

    delete= async (req:Request, res:Response, next:NextFunction) => {
        // try{
        //     const result=await ProvinceService.create(req.body);

        //     return result;
        // }catch(error){
        //     next(error);
        // }
        
    }
}

export default new ProvinceController();