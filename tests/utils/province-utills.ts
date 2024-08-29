import {prismaClient} from "../../src/applications/database";

const removeTestProvince=async () => {
    await prismaClient.province.deleteMany({});
    await prismaClient.$executeRaw`ALTER TABLE provinces AUTO_INCREMENT = 1`;
}

const createTestProvince=async () => {
   let province= await prismaClient.province.create({
        data:{
            name:"Province Test"
        }
    })

    return province;
}

const getTestProvince=async () => {
   let province= await prismaClient.province.findFirst({
        where:{
            name:"Province Test"
        },
        select:{
            id:true,
            name:true
        }
    })

    return province;
}

const createManyTestProvince=async () => {
    for(let i=0;i  <  15;i++){
        await prismaClient.province.create({
            data:{
                name:`Province ${i}`
            }
        });
    }
}

export {
    removeTestProvince,
    createTestProvince,
    getTestProvince,
    createManyTestProvince
}