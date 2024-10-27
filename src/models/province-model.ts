import { Province } from "@prisma/client";

export type ProvinceResponse={
    id:number;
    name:string;
}

export type CreateProvinceRequest={
    name:string;
}

export function toProvinceResponse(province:Province):ProvinceResponse{
    return {
        id:province.id,
        name:province.name
    }
}

export type UpdateProvinceRequest={
    name?:string;
}