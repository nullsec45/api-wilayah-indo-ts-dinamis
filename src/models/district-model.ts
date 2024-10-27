import { District } from "@prisma/client";

export type DistrictResponse={
    id:number;
    regency_id:number;
    name:string;
}

export type CreateDistrictRequest={
    regency_id:string;
    name:string;
}

export function toDistrictResponse(district:District):DistrictResponse{
    return {
        id:district.id,
        regency_id:district.regency_id,
        name:district.name
    }
}

export type UpdateRegencyeRequest={
    regency_id:string;
    name:string;
}