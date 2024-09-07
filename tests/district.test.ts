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

describe.skip("POST /api/v1/districts", function(){
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

describe.skip("GET /api/v1/districts/:id", function(){
    let district:any=null;

    beforeEach(async() => {
       district=await createTestDistrict();
    });

    afterEach(async() => {
        await removeTestDistrict();
        await removeTestRegency();
    });

     it("should can get regency", async() => {

        const result=await supertest(server).get("/api/v1/districts/"+district.id);

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("District Test");
    });

    it("should return 404 if regency id is not found", async() => {
        const result=await supertest(server).get("/api/v1/districts/99");

        logger.info(result.body);

        expect(result.status).toBe(404);
    });
});

describe.skip("PUT /api/v1/districts/:id", function(){
    let district:any=null;

    beforeEach(async() => {
        district=await createTestDistrict();
    });

    afterEach(async() => {
        await removeTestDistrict();
        await removeTestRegency();
    });

    it("should can update district", async() => {

        const result=await supertest(server).put("/api/v1/districts/"+district.id).send({
            name:"District Update",
        });;

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("District Update");
    });

    it("should return 404 if district id is not found", async() => {
        const result=await supertest(server).put("/api/v1/districts/99").send({
            name:"District Test",
        });

        logger.info(result.body);

        expect(result.status).toBe(404);
    });


    it("should reject if request not valid", async() => {
        const result=await supertest(server).put("/api/v1/regencies/"+district.id).send({
            name:"",
            regency_id:""
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if regency is not found", async() => {
        const result=await supertest(server).put("/api/v1/districts/"+district.id).send({
            name:"District Test",
            regency_id:999
        });

        logger.info(result.body);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
});

describe.skip("DELETE /api/v1/districts/:id",() => {
    let district:any=null;

    beforeEach(async() => {
        district=await createTestDistrict();
    });

    afterEach(async() => {
        await removeTestDistrict();
    });

    it("should can delete district", async() => {
        let testDistrict = await getTestDistrict();

        const result=await supertest(server).delete("/api/v1/districts/"+testDistrict.id);

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.message).toBe("Delete Success");

        testDistrict = await getTestDistrict();
        expect(testDistrict).toBeNull();
    });

    it("should return 404 if district id is not found", async() => {
        const result=await supertest(server).delete("/api/v1/districts/99");

        logger.info(result.body);

        expect(result.status).toBe(404);
    });
});

describe("GET /api/v1/districts/", () => {
    let district:any=null;

    beforeEach(async() => {
        district=await createManyTestDistrict();
    });

    afterEach(async() => {
        await removeTestDistrict();
    });

    it("should can get all districts", async() => {
        const result=await supertest(server).get("/api/v1/districts");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(15);
    });
});