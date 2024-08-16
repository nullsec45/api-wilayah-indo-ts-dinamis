import {prismaClient} from "../../src/applications/database";

const removeTestProvince=async () => {
    await prismaClient.province.deleteMany({});
    await prismaClient.$executeRaw`ALTER TABLE provinces AUTO_INCREMENT = 1`;
}

export {
    removeTestProvince
}