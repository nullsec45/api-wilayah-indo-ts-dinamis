import {prismaClient} from "../../src/applications/database";
import {  createTestRegency } from "./regency-utils";

const removeTestDistrict=async () => {
    await prismaClient.district.deleteMany({});
    await prismaClient.$executeRaw`ALTER TABLE districts AUTO_INCREMENT = 1`;
}

const createTestDistrict=async () => {
   const regency=await createTestRegency();
   const district= await prismaClient.district.create({
        data:{
            name:"District Test",
             regency: {
               connect: { id: regency.id } 
           }
        },
        select:{
            id:true,
            regency_id:true,
            name:true
        }
    })

    return district;
}

const getTestDistrict=async () => {
   let district= await prismaClient.district.findFirst({
        where:{
            name:"District Test"
        },
        select:{
            id:true,
            regency_id:true,
            name:true
        }
    })

    return district
};

const createManyTestDistrict=async () => {
   const regency=await createTestRegency();

    for(let i=0;i  <  15;i++){
        await prismaClient.district.create({
           data:{
              name:`District ${i}`,
                regency: {
                  connect: { id: regency.id } 
                }
           }
        });
    }
}

export {
    removeTestDistrict,
    createTestDistrict,
    getTestDistrict,
    createManyTestDistrict,
}