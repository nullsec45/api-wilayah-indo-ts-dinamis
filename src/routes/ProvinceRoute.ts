import BaseRoutes from "./BaseRoutes";

import ProvinceController from "../controllers/ProvinceController";

class ProvinceRoutes extends BaseRoutes{
    public routes():void{
        this.router.post("/", ProvinceController.create);
        this.router.get("/:id", ProvinceController.show);
        this.router.put("/:id", ProvinceController.update);
        this.router.delete("/:id", ProvinceController.delete);
    }
}

export default new ProvinceRoutes().router;