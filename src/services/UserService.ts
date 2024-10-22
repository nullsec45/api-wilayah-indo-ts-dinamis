import { Request } from "express";
import { prismaClient } from "../applications/database";
import Validation from "../validations/Validation";
import { 
    registerUserValidation, 
    loginUserValidation,
    updateUserValidation 
} from "../validations/user-validation";
import ResponseError from "../errors/ResponseError";
import ProvinceService from "./ProvinceService";
import bcrypt from "bcrypt";
import { toUserResponse } from "../../models/user-model";
import {v4 as uuid} from "uuid";
import { CreateUserRequest, LoginUserRequest } from "../models/user-model";

class UserService{
    static async login(request:LoginUserRequest){
        const login=Validation.validate(loginUserValidation, request);

        let user=await prismaClient.user.findFirst({
            where:{
                username:login.username
            }
        });

        if(!user){
            throw new ResponseError(401,"Username or password is wrong");
        }

        const isPasswordValid=await bcrypt.compare(login.password, user.password);

        if(!isPasswordValid){
            throw new ResponseError(401,"Username or password is wrong");
        }

        user = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                token: uuid()
            }
        });

        const response=toUserResponse(user);
        response.token=user.token!;
        return response;

    }

    static async register(request:CreateUserRequest){
        const register=Validation.validate(registerUserValidation, request);

        const totalUserWithSameUser=await prismaClient.user.count({
            where:{
                username:register.username
            }
        });

        if(totalUserWithSameUser !== 0){
            throw new ResponseError(404, "Username already exists");
        }

        register.password=await bcrypt.hash(register.password, 10);

        const user=await prismaClient.user.create({
            data:register
        });

        return toUserResponse(user);
    }

    static async update(id:number, request:Request){
        const regency=Validation.validate(updateUserValidation, request);

        const checkRegency = await prismaClient.regency.count({
            where: {
                id
            },
        });

        if (checkRegency == 0) {
            throw new ResponseError(404, "Regency is not found!");
        }

        if(!await ProvinceService.checkExistsProvince(regency.province_id)){
            throw new ResponseError(404, "Province is not found");
        }

        return prismaClient.regency.update({
            where:{
                id
            },
            data:{
                name:regency.name,
                province_id:regency.province_id
            },
            select:{
                id:true,
                province_id:true,
                name:true
            }
        });
    }

    static async remove(id:number){
      
    }   
}

export default UserService;