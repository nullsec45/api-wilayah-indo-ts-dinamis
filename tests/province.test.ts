import { server } from "../src/applications/server";
import supertest from "supertest";
import { logger } from "../src/applications/logging";
import {removeTestProvince} from "./utils/province-utills";


describe("POST /api/v1/provinces", function(){
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