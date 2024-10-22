import { Request, Response, NextFunction } from "express";
import VillageService from "../services/VillageService";
import AuthController from "./AuthControllerInterface";
import UserService from "../services/UserService";
import { logger } from "../applications/logging";
import { CreateUserRequest } from "../models/user-model";
import { LoginUserRequest } from "../../models/user-model";

class UserController implements AuthController{
    login= async (req:Request, res:Response, next:NextFunction) => {
       try{
            const request:LoginUserRequest=req.body as LoginUserRequest;
            const result=await UserService.login(request);
            
            res.status(200).json({
                data: result,
            });
        }catch(error){
            next(error);
        }
    }

    register= async (req:Request, res:Response, next:NextFunction) => {
       try{
            const request:CreateUserRequest=req.body as CreateUserRequest;
            const result=await UserService.register(request);

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