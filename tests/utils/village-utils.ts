import {prismaClient} from "../../src/applications/database";
import {  createTestDistrict } from "./district-utils";

const removeTestVillage=async () => {
    await prismaClient.village.deleteMany({});
    await prismaClient.$executeRaw`ALTER TABLE villages AUTO_INCREMENT = 1`;
}

const createTestVillage=async () => {
   const district=await createTestDistrict();
   const village= await prismaClient.village.create({
        data:{
            name:"Village Test",
            postal_code:"1111",
            district: {
               connect: { id: district.id } 
           }
        },
        select:{
            id:true,
            district_id:true,
            name:true,
            postal_code:true
        }
    })

    return village;
}

const getTestVillage=async () => {
   let district= await prismaClient.village.findFirst({
        where:{
            name:"Village Test"
        },
        select:{
            id:true,
            district_id:true,
            name:true,
            postal_code:true
        }
    })

    return district
};

const createManyTestVillage=async () => {
   const district=await createTestDistrict();

    for(let i=0;i<15;i++){
        await prismaClient.village.create({
           data:{
                name:`District ${i}`,
                postal_code:"1111",
                district: {
                  connect: { id: district.id } 
                }
           },
           select:{
            id:true,
            district_id:true,
            name:true,
            postal_code:true
          }
        });
    }
}

export {
    removeTestVillage,
    createTestVillage,
    getTestVillage,
    createManyTestVillage,
}