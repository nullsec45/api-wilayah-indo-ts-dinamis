import { server } from "../src/applications/server";
import supertest from "supertest";
import { logger } from "../src/applications/logging";
import {
    removeTestVillage, 
    createTestVillage,
    getTestVillage,
    createManyTestVillage
} from "./utils/village-utils";
import { removeTestProvince } from "./utils/province-utills";
import { removeTestRegency } from "./utils/regency-utils";
import { createTestDistrict, removeTestDistrict } from "./utils/district-utils";
import {createUser, deleteUser} from "./utils/user-utils";


describe("POST /api/v1/villages", function(){
    beforeEach(async() => {
        await createUser();
    });

    afterEach(async () => {
        await deleteUser();
        await removeTestVillage();
        await removeTestDistrict();
        await removeTestRegency();
        await removeTestProvince();
    });

    it("should can create village", async() => {
        const district=await createTestDistrict();

        const result=await supertest(server).post("/api/v1/villages")
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"Village Test",
                                                district_id:district.id,
                                                postal_code:"1111"
                                            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("Village Test");
    });
    
    it("should reject if district is not found", async() => {
        const result=await supertest(server).post("/api/v1/villages")
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"Village Test",
                                                district_id:999,
                                                postal_code:"1111"
                                            });

        logger.info(result.body);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if request is not valid", async() => {
        const result=await supertest(server).post("/api/v1/villages")
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"",
                                                district_id:"",
                                                postal_code:""
                                            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe("GET /api/v1/villages/:id", function(){
    let village:any=null;

    beforeEach(async() => {
        await createUser();
       village=await createTestVillage();
    });

    afterEach(async() => {
        await deleteUser();
        await removeTestVillage();
        await removeTestDistrict();
        await removeTestRegency();
        await removeTestProvince();
    });

     it("should can get regency", async() => {
        const result=await supertest(server).get("/api/v1/villages/"+village.id);

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("Village Test");
        expect(result.body.data.postal_code).toBe("1111");
    });

    it("should return 404 if regency id is not found", async() => {
        const result=await supertest(server).get("/api/v1/villages/99");

        logger.info(result.body);

        expect(result.status).toBe(404);
    });
});

describe("PUT /api/v1/villages/:id", function(){
    let village:any=null;
    let district:any=null;

    beforeEach(async() => {
        await createUser();
        village=await createTestVillage();
        district=await createTestDistrict();
    });

    afterEach(async() => {
        await deleteUser();
        await removeTestVillage();
        await removeTestDistrict();
        await removeTestRegency();
        await removeTestProvince();
    });

    it("should can update village", async() => {
        const result=await supertest(server).put("/api/v1/villages/"+village.id)
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"Village Update",
                                                district_id: district.id,
                                                postal_code:"9999"
                                            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("Village Update");
        expect(result.body.data.postal_code).toBe("9999");
    });

    it("should return 404 if village id is not found", async() => {
        const result=await supertest(server).put("/api/v1/villages/99999")
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"Regency Test",
                                                district_id:district.id,
                                                postal_code:"9999"
                                            });

        logger.info(result.body);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });


    it("should reject if request not valid", async() => {
        const result=await supertest(server).put("/api/v1/villages/"+village.id)
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"",
                                                district_id:"",
                                                postal_code:""
                                            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if district is not found", async() => {
        const result=await supertest(server).put("/api/v1/villages/"+village.id)
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"Regency Test",
                                                district_id:999,
                                                postal_code:"99999"
                                            });

        logger.info(result.body);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
});

describe("DELETE /api/v1/villages/:id",() => {
    let village:any=null;

    beforeEach(async() => {
        await createUser();
        village=await createTestVillage();
    });

    afterEach(async() => {
        await deleteUser();
        await removeTestVillage();
        await removeTestDistrict();
        await removeTestRegency();
        await removeTestProvince();
    });

    it("should can delete village", async() => {
        let testVillage = await getTestVillage();
       

        const result=await supertest(server).delete("/api/v1/villages/"+testVillage.id)
                                            .set("X-API-TOKEN","test");

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.message).toBe("Delete Success");

        testVillage = await getTestVillage();
        expect(testVillage).toBeNull();
    });

    it("should return 404 if village id is not found", async() => {
        const result=await supertest(server).delete("/api/v1/villages/99")
                                            .set("X-API-TOKEN","test");

        logger.info(result.body);

        expect(result.status).toBe(404);
    });
});

describe("GET /api/v1/villages/", () => {
    let village:any=null;

    beforeEach(async() => {
        village=await createManyTestVillage();
    });

    afterEach(async() => {
        await removeTestVillage();
        await removeTestDistrict();
        await removeTestRegency();
        await removeTestProvince();
    });

    it("should can get all villages", async() => {
        const result=await supertest(server).get("/api/v1/villages");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(15);
    });
});