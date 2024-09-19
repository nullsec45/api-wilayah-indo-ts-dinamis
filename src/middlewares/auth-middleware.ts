import { UserRequest } from "../../types/user-request";
import { prismaClient } from "../applications/database";
import {  Response, NextFunction } from "express";

const authMiddleware = async ( req: UserRequest, res: Response, next: NextFunction) => {
  const token=req.get("X-API-TOKEN");

  if (!token) {
    return res.status(401).json({
      errors: "Unauthorized: Token is missing"
    });
  }

  if(token){
    const user=await prismaClient.user.findFirst({
        where:{
            token
        }
    });

    if (!user) {
      return res.status(401).json({
        errors: "Unauthorized: Invalid token"
      });
    }

    req.user = user;
    next(); // Move to the next middleware or route handler
  }
};

export { authMiddleware };
