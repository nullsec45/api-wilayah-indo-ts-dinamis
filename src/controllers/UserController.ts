import { Request, Response, NextFunction } from "express";
import VillageService from "../services/VillageService";
import AuthController from "./AuthControllerInterface";
import UserService from "../services/UserService";
import { logger } from "../applications/logging";

class UserController implements AuthController{
    login= async (req:Request, res:Response, next:NextFunction) => {
       try{
            const result=await UserService.login(req.body);
            
            res.status(200).json({
                data: result,
            });
        }catch(error){
            next(error);
        }
    }

    register= async (req:Request, res:Response, next:NextFunction) => {
       try{
            const result=await UserService.register(req.body);

            logger.info(result);
            
            res.status(200).json({
                data: result,
            });
        }catch(error){
            next(error);
        }
    }

    update= async (req:Request, res:Response, next:NextFunction) => {
     
    }

    delete= async (req:Request, res:Response, next:NextFunction) => {
        
    }
}

export default new UserController();