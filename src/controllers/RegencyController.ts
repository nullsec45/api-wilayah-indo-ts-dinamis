import { Request, Response, NextFunction } from "express";
import RegencyService from "../services/RegencyService";
import IController from "./ControllerInterface";

class RegencyController implements IController{
    index= async (req:Request, res:Response, next:NextFunction) => {
         try{
            const result=await RegencyService.index();
            
            res.status(200).json({
                data: result,
            });
        }catch(error){
            next(error);
        }
    }

    create= async (req:Request, res:Response, next:NextFunction) => {
        try{
            const result=await RegencyService.create(req.body);
            
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
            const result=await RegencyService.get(regencyId);

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
            const result=await RegencyService.update(id, request);

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
            await RegencyService.remove(regencyId);

            res.status(200).json({
                 message: "Delete Success",
            });
        }catch(error){
            next(error);
        }
    }
}

export default new RegencyController();