import { UserRequest } from "../../types/user-request";
import { prismaClient } from "../applications/database";
import {  Response, NextFunction } from "express";

const authMiddleware = async (err: any, req: UserRequest, res: Response, next: NextFunction) => {
  const token=req.get("X-Token");

  if(token){
    const user=await prismaClient.user.findFirst({
        where:{
            token
        }
    });

    if(user){
        req.user=user;
        next();
        return;
    }

    res.status(401).json({
      errors:"Unathorized"
    }).end();
  }
};

export { authMiddleware };
