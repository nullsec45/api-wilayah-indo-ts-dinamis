import { server } from "../src/applications/server";
import  supertest from "supertest";
import { logger } from "../src/applications/logging";

import { 
    createTestRegency,
    removeTestRegency,
    getTestRegency,
    createManyTestRegency
 } from "./utils/regency-utils";
import { removeTestProvince, createTestProvince } from "./utils/province-utills";

describe("POST /api/v1/regencies ", function(){
    afterEach(async () => {
        await removeTestRegency();
        await removeTestProvince();
    });

    it("should can create regency", async() => {
        const province=await createTestProvince();
        

        const result=await supertest(server).post("/api/v1/regencies").send({
            name:"Regency Test",
            province_id:province.id
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("Regency Test");
    });

    it("should reject if province is not found", async() => {
        const result=await supertest(server).post("/api/v1/regencies").send({
            name:"Regency Test",
            province_id:999
        });

        logger.info(result.body);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if request not valid", async() => {
        const result=await supertest(server).post("/api/v1/regencies").send({
            name:"",
            province_id:""
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe.skip("GET /api/v1/regencies/:id", function(){
    let regency:any=null;

    beforeEach(async() => {
       regency=await createTestRegency();
    });

    afterEach(async() => {
        await removeTestRegency();
        await  removeTestProvince();
    });

     it("should can get regency", async() => {

        const result=await supertest(server).get("/api/v1/regencies/"+regency.id);

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("Regency Test");
    });

    it("should return 404 if regency id is not found", async() => {
        const result=await supertest(server).get("/api/v1/regencies/99");

        logger.info(result.body);

        expect(result.status).toBe(404);
    });
});

describe.skip("PUT /api/v1/regencies/:id", function(){
    let regency:any=null;

    beforeEach(async() => {
        regency=await createTestRegency();
    });

    afterEach(async() => {
        await removeTestRegency();
        await  removeTestProvince();
    });

    it("should can update regency", async() => {

        const result=await supertest(server).put("/api/v1/regencies/"+regency.id).send({
            name:"Regency Update",
        });;

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("Regency Update");
    });

    it("should return 404 if regency id is not found", async() => {
        const result=await supertest(server).put("/api/v1/regencies/99").send({
            name:"Regency Test",
        });

        logger.info(result.body);

        expect(result.status).toBe(404);
    });


    it("should reject if request not valid", async() => {
        const result=await supertest(server).put("/api/v1/regencies/"+regency.id).send({
            name:"",
            province_id:""
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if province is not found", async() => {
        const result=await supertest(server).put("/api/v1/regencies/"+regency.id).send({
            name:"Regency Test",
            province_id:999
        });

        logger.info(result.body);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
});

describe.skip("DELETE /api/v1/regencies/:id", function(){
    let regency:any=null;

    beforeEach(async() => {
        regency=await createTestRegency();
    });

    afterEach(async() => {
        await removeTestRegency();
        await  removeTestProvince();

    });

    it("should can delete regency", async() => {
        let testRegency = await getTestRegency();

        const result=await supertest(server).delete("/api/v1/regencies/"+testRegency.id);

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.message).toBe("Delete Success");

        testRegency = await getTestRegency();
        expect(testRegency).toBeNull();
    });

    it("should return 404 if regency id is not found", async() => {
        const result=await supertest(server).delete("/api/v1/regencies/99");

        logger.info(result.body);

        expect(result.status).toBe(404);
    });
});

describe.skip("GET /api/v1/regencies/", () => {
    let regency:any=null;

    beforeEach(async() => {
        regency=await createManyTestRegency();
    });

    afterEach(async() => {
        await removeTestRegency();
        await removeTestProvince();
    });

    it("should can get all regencies", async() => {
        const result=await supertest(server).get("/api/v1/regencies");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(15);
    });
});