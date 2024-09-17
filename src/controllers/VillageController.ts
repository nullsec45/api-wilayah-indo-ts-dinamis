import { Request, Response, NextFunction } from "express";
import VillageService from "../services/VillageService";
import IController from "./ControllerInterface";

class VillageController implements IController{
    index= async (req:Request, res:Response, next:NextFunction) => {
         try{
            const result=await VillageService.index();
            
            res.status(200).json({
                data: result,
            });
        }catch(error){
            next(error);
        }
    }

    create= async (req:Request, res:Response, next:NextFunction) => {
        try{
            const result=await VillageService.create(req.body);
            
            res.status(200).json({
                data: result,
            });
        }catch(error){
            next(error);
        }
    }

    show= async (req:Request, res:Response, next:NextFunction) => {
         try{
            const regencyId=parseInt(req.params.id);
            const result=await VillageService.get(regencyId);

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
            const result=await VillageService.update(id, request);

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
            const regencyId=parseInt(req.params.id);
            await VillageService.remove(regencyId);

            res.status(200).json({
                 message: "Delete Success",
            });
        }catch(error){
            next(error);
        }
    }
}

export default new VillageController();