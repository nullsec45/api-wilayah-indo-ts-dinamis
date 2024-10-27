import { Village } from "@prisma/client";

export type VillageResponse={
    id:number;
    district_id:number;
    name:string;
    postal_code:string;
}

export type CreateVillageRequest={
    district_id:string;
    name:string;
    postal_code:string;
}

export function toVillageResponse(village:Village):VillageResponse{
    return {
        id:village.id,
        district_id:village.district_id,
        name:village.name,
        postal_code:village.postal_code
    }
}

export type UpdateVillageRequest={
    district_id:string;
    name:string;
}