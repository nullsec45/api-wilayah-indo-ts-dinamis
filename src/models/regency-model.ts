import { Regency } from "@prisma/client";

export type RegencyResponse={
    id:number;
    province_id:number;
    name:string;
}

export type CreateRegencyRequest={
    province_id:string;
    name:string;
}

export function toRegencyResponse(regency:Regency):RegencyResponse{
    return {
        id:regency.id,
        province_id:regency.province_id,
        name:regency.name
    }
}

export type UpdateRegencyRequest={
    proince_id:string;
    name:string;
}