import BaseRoutes from "./BaseRoutes";

import ProvinceController from "../controllers/ProvinceController";

class ProvinceRoutes extends BaseRoutes{
    public routes():void{
        this.router.post("/", ProvinceController.create);
        this.router.get("/:id", ProvinceController.show);
    }
}

export default new ProvinceRoutes().router;