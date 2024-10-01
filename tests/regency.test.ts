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
import {createUser, deleteUser} from "./utils/user-utils";

describe("POST /api/v1/regencies ", function(){
    beforeEach(async() => {
        await createUser();
    });

    afterEach(async () => {
        await removeTestRegency();
        await removeTestProvince();
    });

    it("should can create regency", async() => {
        const province=await createTestProvince();
        

        const result=await supertest(server).post("/api/v1/regencies")
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"Regency Test",
                                                province_id:province.id
                                            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("Regency Test");
    });

    it("should reject if province is not found", async() => {
        const result=await supertest(server).post("/api/v1/regencies")
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"Regency Test",
                                                province_id:999
                                            });

        logger.info(result.body);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if request not valid", async() => {
        const result=await supertest(server).post("/api/v1/regencies")
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"",
                                                province_id:""
                                            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if token is missing", async() => {
        const province=await createTestProvince();

        const result=await supertest(server)
                            .post("/api/v1/regencies")
                            .set("X-API-TOKEN","")
                            .send({
                                name:"Test",
                                province_id:province.id

                            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe("Unauthorized: Token is missing");
    });

    it("should reject if token is invalid", async() => {
        const province=await createTestProvince();

        const result=await supertest(server)
                            .post("/api/v1/regencies")
                            .set("X-API-TOKEN","salah")
                            .send({
                                name:"Test",
                                province_id:province.id
                            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe("Unauthorized: Invalid token");
    });
});

describe("GET /api/v1/regencies/:id", function(){
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

describe("PUT /api/v1/regencies/:id", function(){
    let regency:any=null;

    beforeEach(async() => {
        await createUser();
        regency=await createTestRegency();
    });

    afterEach(async() => {
        await deleteUser();
        await removeTestRegency();
        await removeTestProvince();
    });

    it("should can update regency", async() => {

        const result=await supertest(server).put("/api/v1/regencies/"+regency.id)
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"Regency Update",
                                            });;

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("Regency Update");
    });

    it("should return 404 if regency id is not found", async() => {
        const result=await supertest(server).put("/api/v1/regencies/99")
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"Regency Test",
                                            });

        logger.info(result.body);

        expect(result.status).toBe(404);
    });


    it("should reject if request not valid", async() => {
        const result=await supertest(server).put("/api/v1/regencies/"+regency.id)
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"",
                                                province_id:""
                                            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if province is not found", async() => {
        const result=await supertest(server).put("/api/v1/regencies/"+regency.id)
                                            .set("X-API-TOKEN","test")
                                            .send({
                                                name:"Regency Test",
                                                province_id:999
                                            });

        logger.info(result.body);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if token is missing", async() => {
        const province=await createTestProvince();

        const result=await supertest(server)
                            .put("/api/v1/regencies/"+regency.id)
                            .set("X-API-TOKEN","")
                            .send({
                                name:"Test",
                                province_id:province.id

                            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe("Unauthorized: Token is missing");
    });

    it("should reject if token is invalid", async() => {
        const province=await createTestProvince();

        const result=await supertest(server)
                            .put("/api/v1/regencies/"+regency.id)
                            .set("X-API-TOKEN","salah")
                            .send({
                                name:"Test",
                                province_id:province.id
                            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe("Unauthorized: Invalid token");
    });
});

describe("DELETE /api/v1/regencies/:id", function(){
    let regency:any=null;

    beforeEach(async() => {
        await createUser();
        regency=await createTestRegency();
    });

    afterEach(async() => {
        await deleteUser();
        await removeTestRegency();
        await  removeTestProvince();

    });

    it("should can delete regency", async() => {
        let testRegency = await getTestRegency();

        const result=await supertest(server).delete("/api/v1/regencies/"+testRegency.id)
                                            .set("X-API-TOKEN","test");

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.message).toBe("Delete Success");

        testRegency = await getTestRegency();
        expect(testRegency).toBeNull();
    });

    it("should return 404 if regency id is not found", async() => {
        const result=await supertest(server).delete("/api/v1/regencies/99")
                                            .set("X-API-TOKEN","test");

        logger.info(result.body);

        expect(result.status).toBe(404);
    });

    it("should reject if token is missing", async() => {
        let testRegency = await getTestRegency();
 

        const result=await supertest(server)
                            .delete("/api/v1/regencies/"+testRegency.id)
                            .set("X-API-TOKEN","");
        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe("Unauthorized: Token is missing");
    });

    it("should reject if token is invalid", async() => {
        let testRegency = await getTestRegency();


        const result=await supertest(server)
                            .delete("/api/v1/regencies/"+testRegency.id)
                            .set("X-API-TOKEN","salah");

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe("Unauthorized: Invalid token");
    });
});

describe("GET /api/v1/regencies/", () => {
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