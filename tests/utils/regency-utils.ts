import {prismaClient} from "../../src/applications/database";
import {  createTestProvince } from "./province-utills";

const removeTestRegency=async () => {
    await prismaClient.regency.deleteMany({});
    await prismaClient.$executeRaw`ALTER TABLE regencies AUTO_INCREMENT = 1`;
}

const createTestRegency=async () => {
   const province=await createTestProvince();
   const regency= await prismaClient.regency.create({
        data:{
            name:"Regency Test",
             province: {
               connect: { id: province.id } 
           }
        },
        select:{
            id:true,
            name:true
        }
    })

    return regency;
}

const getTestRegency=async () => {
   let regency= await prismaClient.regency.findFirst({
        where:{
            name:"Regency Test"
        },
        select:{
            id:true,
            province_id:true,
            name:true
        }
    })

    return regency
};

const createManyTestRegency=async () => {
   const province=await createTestProvince();

    for(let i=0;i  <  15;i++){
        await prismaClient.regency.create({
           data:{
              name:`Regency ${i}`,
                province: {
                connect: { id: province.id } 
                }
           }
        });
    }
}

export {
    removeTestRegency,
    createTestRegency,
    getTestRegency,
    createManyTestRegency
}