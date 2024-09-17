import { Request, Response, NextFunction } from "express";

interface AuthController{
    login(req: Request, res: Response, next:NextFunction):any;
    register(req: Request, res: Response, next:NextFunction):any;
    update(req: Request, res: Response, next:NextFunction):any;
    delete(req: Request, res: Response, next:NextFunction):any;
}

export default AuthController;