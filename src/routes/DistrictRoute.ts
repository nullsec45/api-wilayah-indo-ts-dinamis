import BaseRoutes from "./BaseRoutes";

import DistrictController from "../controllers/DistrictController";

class DistrictRoutes extends BaseRoutes{
    public routes():void{
        this.router.get("/", DistrictController.index);
        this.router.post("/", DistrictController.create);
        this.router.get("/:id", DistrictController.show);
        this.router.put("/:id", DistrictController.update);
        this.router.delete("/:id", DistrictController.delete);
    }
}

export default new DistrictRoutes().router;