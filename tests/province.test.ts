import { server } from "../src/applications/server";
import supertest from "supertest";
import { logger } from "../src/applications/logging";
import {removeTestProvince, createTestProvince,getTestProvince} from "./utils/province-utills";


describe.skip("POST /api/v1/provinces", function(){
    afterEach(async () => {
       await  removeTestProvince();
    });

    it("should can create province", async() => {
        const result=await supertest(server).post("/api/v1/provinces").send({
            name:"DKI Jakarta"
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("DKI Jakarta");
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
});