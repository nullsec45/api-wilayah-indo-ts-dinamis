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

 describe.skip("POST /api/v1/regencies ", function(){
     afterEach(async () => {
        await removeTestRegency();
        await  removeTestProvince();
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
});

describe("DELETE /api/v1/regencies/:id", function(){
    let regency:any=null;

    beforeEach(async() => {
        regency=await createTestRegency();
    });

    afterEach(async() => {
        await removeTestRegency();
        await  removeTestProvince();
    });

     it("should can update regency", async() => {
        let testRegency = await getTestRegency();

        const result=await supertest(server).delete("/api/v1/regencies/"+testRegency.id);

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.message).toBe("Delete Success");

        testRegency = await getTestRegency();
        expect(testRegency).toBeNull();
    });
});