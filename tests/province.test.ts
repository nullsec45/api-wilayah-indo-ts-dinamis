import { server } from "../src/applications/server";
import supertest from "supertest";
import { logger } from "../src/applications/logging";
import {
    removeTestProvince, 
    createTestProvince,
    getTestProvince,
    createManyTestProvince
} from "./utils/province-utills";


describe.skip("POST /api/v1/provinces", function(){
    afterEach(async () => {
       await  removeTestProvince();
    });

    it.skip("should can create province", async() => {
        const result=await supertest(server).post("/api/v1/provinces").send({
            name:"DKI Jakarta"
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("DKI Jakarta");
    });

    it("should reject if request is not valid", async() => {
        const result=await supertest(server).post("/api/v1/provinces").send({
            name:""
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe.skip("GET /api/v1/provinces/:id", function(){
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

describe.skip("PUT /api/v1/provinces/:id", function(){
    let province:any=null;

    beforeEach(async() => {
        province=await createTestProvince();
    });

    afterEach(async () => {
       await  removeTestProvince();
    });

    it("should can get province", async() => {
        const result=await supertest(server)
                           .put("/api/v1/provinces/"+province.id)
                           .send({
                                name:"Province Update"
                           });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(province.id);
        expect(result.body.data.name).toBe("Province Update");
    });

    it("should return 404 if province id is not found", async () => {
        const result = await supertest(server).put("/api/v1/provinces/99").send({
            name:"DKI Jakarta"
        });

        expect(result.status).toBe(404);
    });

    it("should reject if request is not valid", async() => {
        const result=await supertest(server).put("/api/v1/provinces/"+province.id).send({
            name:""
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe("DELETE /api/v1/provinces/:id", function(){
    let province:any=null;

    beforeEach(async() => {
        province=await createTestProvince();
    });

    afterEach(async () => {
       await removeTestProvince();
    });

    it("should can delete province", async() => {
        let testProvince = await getTestProvince();

        const result=await supertest(server)
                           .delete("/api/v1/provinces/"+testProvince.id);

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.message).toBe("Delete Success");

        testProvince = await getTestProvince();
        expect(testProvince).toBeNull();
    });

    it("should return 404 if province id is not found", async () => {
        const result = await supertest(server).delete("/api/v1/provinces/99");

        expect(result.status).toBe(404);
    });
});

describe.skip("GET /api/v1/provinces", function(){
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