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
import { removeTestProvince } from "./utils/province-utills";
import {createUser, deleteUser} from "./utils/user-utils";

describe("POST /api/v1/districts", function(){
    beforeEach(async() => {
        await createUser();
    });

    afterEach(async () => {
        await deleteUser();
        await removeTestDistrict();
        await removeTestRegency();
        await removeTestProvince();
    });

    it("should can create district", async() => {
        const regency=await createTestRegency();

        const result=await supertest(server).post("/api/v1/districts")
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"District Test",
                                                regency_id:regency.id
                                            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("District Test");
    });
    
    it("should reject if province is not found", async() => {
        const result=await supertest(server).post("/api/v1/districts")
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"District Test",
                                                regency_id:999
                                            });

        logger.info(result.body);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if request is not valid", async() => {
        const result=await supertest(server).post("/api/v1/districts")
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"",
                                                regency_id:""
                                            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

     it("should reject if token is missing", async() => {
        const result=await supertest(server)
                            .post("/api/v1/districts")
                            .set("X-API-TOKEN","")
                            .send({
                                name:"Test"
                            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe("Unauthorized: Token is missing");
    });

    it("should reject if token is invalid", async() => {
        const result=await supertest(server)
                            .post("/api/v1/districts")
                            .set("X-API-TOKEN","salah")
                            .send({
                                name:"Test"
                            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe("Unauthorized: Invalid token");
    });
});

describe("GET /api/v1/districts/:id", function(){
    let district:any=null;

    beforeEach(async() => {
       district=await createTestDistrict();
    });

    afterEach(async() => {
        await removeTestDistrict();
        await removeTestRegency();
        await removeTestProvince();
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

describe("PUT /api/v1/districts/:id", function(){
    let district:any=null;

    beforeEach(async() => {
        await createUser();
        district=await createTestDistrict();
    });

    afterEach(async() => {
        await deleteUser();
        await removeTestDistrict();
        await removeTestRegency();
        await removeTestProvince();
    });

    it("should can update district", async() => {

        const result=await supertest(server).put("/api/v1/districts/"+district.id)
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"District Update",
                                            });;

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("District Update");
    });

    it("should return 404 if district id is not found", async() => {
        const result=await supertest(server).put("/api/v1/districts/99")
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"District Test",
                                            });

        logger.info(result.body);

        expect(result.status).toBe(404);
    });


    it("should reject if request not valid", async() => {
        const result=await supertest(server).put("/api/v1/regencies/"+district.id)
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"",
                                                regency_id:""
                                            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if regency is not found", async() => {
        const result=await supertest(server).put("/api/v1/districts/"+district.id)
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"District Test",
                                                regency_id:999
                                            });

        logger.info(result.body);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if token is missing", async() => {
        const result=await supertest(server)
                           .put("/api/v1/districts/"+district.id)
                            .set("X-API-TOKEN","")
                            .send({
                                name:"Test"
                            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe("Unauthorized: Token is missing");
    });

    it("should reject if token is invalid", async() => {
        const result=await supertest(server)
                           .put("/api/v1/districts/"+district.id)
                            .set("X-API-TOKEN","salah")
                            .send({
                                name:"Test"
                            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe("Unauthorized: Invalid token");
    });
});

describe("DELETE /api/v1/districts/:id",() => {
    let district:any=null;

    beforeEach(async() => {
        await createUser();
        district=await createTestDistrict();
    });

    afterEach(async() => {
        await deleteUser();
        await removeTestDistrict();
        await removeTestRegency();
        await removeTestProvince();
    });

    it("should can delete district", async() => {
        let testDistrict = await getTestDistrict();

        const result=await supertest(server).delete("/api/v1/districts/"+testDistrict.id)
                                            .set("X-API-TOKEN","test");

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.message).toBe("Delete Success");

        testDistrict = await getTestDistrict();
        expect(testDistrict).toBeNull();
    });

    it("should return 404 if district id is not found", async() => {
        const result=await supertest(server).delete("/api/v1/districts/99")
                                            .set("X-API-TOKEN","test");


        logger.info(result.body);

        expect(result.status).toBe(404);
    });

    it("should reject if token is missing", async() => {
        let testDistrict = await getTestDistrict();

        const result=await supertest(server)
                            .delete("/api/v1/districts/"+testDistrict.id)
                            .set("X-API-TOKEN","");

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe("Unauthorized: Token is missing");
    });

    it("should reject if token is invalid", async() => {
        let testDistrict = await getTestDistrict();

        const result=await supertest(server)
                            .delete("/api/v1/districts/"+testDistrict.id)
                            .set("X-API-TOKEN","salah");

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe("Unauthorized: Invalid token");
    });
});

describe("GET /api/v1/districts/", () => {
    let district:any=null;

    beforeEach(async() => {
        district=await createManyTestDistrict();
    });

    afterEach(async() => {
        await removeTestDistrict();
        await removeTestRegency();
        await removeTestProvince();
    });

    it("should can get all districts", async() => {
        const result=await supertest(server).get("/api/v1/districts");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(15);
    });
});