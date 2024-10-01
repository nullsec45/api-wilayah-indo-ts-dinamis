import { server } from "../src/applications/server";
import supertest from "supertest";
import { logger } from "../src/applications/logging";
import {
    removeTestProvince, 
    createTestProvince,
    getTestProvince,
    createManyTestProvince
} from "./utils/province-utills";
import {createUser, deleteUser} from "./utils/user-utils";

describe("POST /api/v1/provinces", function(){
    beforeEach(async() => {
        await createUser();
    });

    afterEach(async () => {
       await removeTestProvince();
       await deleteUser();
    });

    it("should can create province", async() => {
        const result=await supertest(server).post("/api/v1/provinces")
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                 name:"DKI Jakarta"
                                            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("DKI Jakarta");
    });

    it("should reject if request is not valid", async() => {
        const result=await supertest(server)
                            .post("/api/v1/provinces")
                            .set("X-API-TOKEN","test")
                            .send({
                                name:""
                            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if token is missing", async() => {
        const result=await supertest(server)
                            .post("/api/v1/provinces")
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
                            .post("/api/v1/provinces")
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

describe("GET /api/v1/provinces/:id", function(){
    let province:any=null;

    beforeEach(async() => {
        province=await createTestProvince();
    });

    afterEach(async () => {
       await  removeTestProvince();
    });

    it("should can get province", async() => {
        const result=await supertest(server).get("/api/v1/provinces/"+province.id);

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(province.id);
        expect(result.body.data.name).toBe(province.name);
    });

    it("should return 404 if province id is not found", async () => {
         const result = await supertest(server)
      .get("/api/v1/provinces/99")

         expect(result.status).toBe(404);
     });
});

describe("PUT /api/v1/provinces/:id", function(){
    let province:any=null;

    beforeEach(async() => {
        await createUser();
        province=await createTestProvince();
    });

    afterEach(async () => {
       await deleteUser();
       await removeTestProvince();
    });

    it("should can get province", async() => {
        const result=await supertest(server)
                           .put("/api/v1/provinces/"+province.id)
                           .set("X-API-TOKEN","test")
                           .send({
                                name:"Province Update"
                           });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(province.id);
        expect(result.body.data.name).toBe("Province Update");
    });

    it("should return 404 if province id is not found", async () => {
        const result = await supertest(server).put("/api/v1/provinces/99")
                                              .set("X-API-TOKEN","test")
                                              .send({
                                                name:"DKI Jakarta"
                                               });

        expect(result.status).toBe(404);
    });

    it("should reject if request is not valid", async() => {
        const result=await supertest(server).put("/api/v1/provinces/"+province.id)
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:""
                                            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });


    it("should reject if token is missing", async() => {
        const result=await supertest(server)
                           .put("/api/v1/provinces/"+province.id)
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
                           .put("/api/v1/provinces/"+province.id)
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

describe("DELETE /api/v1/provinces/:id", function(){
    let province:any=null;

    beforeEach(async() => {
        await createUser();
        province=await createTestProvince();
    });

    afterEach(async () => {
       await deleteUser();
       await removeTestProvince();
    });

    it("should can delete province", async() => {
        let testProvince = await getTestProvince();

        const result=await supertest(server)
                            .delete("/api/v1/provinces/"+testProvince.id)
                            .set("X-API-TOKEN","test");

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.message).toBe("Delete Success");

        testProvince = await getTestProvince();
        expect(testProvince).toBeNull();
    });

    it("should return 404 if province id is not found", async () => {
        const result = await supertest(server)
                            .delete("/api/v1/provinces/99")
                            .set("X-API-TOKEN","test");

        expect(result.status).toBe(404);
    });

    it("should reject if token is missing", async() => {
        let testProvince = await getTestProvince();

        const result=await supertest(server)
                            .delete("/api/v1/provinces/"+testProvince.id)
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
        let testProvince = await getTestProvince();

        const result=await supertest(server)
                            .delete("/api/v1/provinces/"+testProvince.id)
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

describe("GET /api/v1/provinces", function(){
    let province:any=null;

    beforeEach(async() => {
        province=await createManyTestProvince();
    });

    afterEach(async () => {
       await removeTestProvince();
    });

    it("should can get all provinces", async() => {
        const result=await supertest(server).get("/api/v1/provinces");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(15);
    });
});