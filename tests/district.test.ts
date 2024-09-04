import { server } from "../src/applications/server";
import supertest from "supertest";
import { logger } from "../src/applications/logging";
import {
    removeTestDistrict, 
    createTestDistrict,
    getTestDistrict,
    createManyTestDistrict
} from "./utils/district-utils";
import { createTestRegency, removeTestRegency } from "./utils/regency-utils";

describe("POST /api/v1/districts", function(){
    afterEach(async () => {
       await  removeTestDistrict();
       await removeTestRegency();
    });

    it("should can create district", async() => {
          const regency=await createTestRegency();

        const result=await supertest(server).post("/api/v1/districts").send({
            name:"District Test",
            regency_id:regency.id
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("District Test");
    });
    
    it("should reject if province is not found", async() => {
        const result=await supertest(server).post("/api/v1/districts").send({
            name:"District Test",
            regency_id:999
        });

        logger.info(result.body);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if request is not valid", async() => {
        const result=await supertest(server).post("/api/v1/districts").send({
            name:"",
            regency_id:""
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});