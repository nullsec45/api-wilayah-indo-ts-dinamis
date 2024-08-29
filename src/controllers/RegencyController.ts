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
        
    }

    update= async (req:Request, res:Response, next:NextFunction) => {
      
        
    }

    delete= async (req:Request, res:Response, next:NextFunction) => {
      
    }
}

export default new RegencyController();