import BaseRoutes from "./BaseRoutes";

import ProvinceController from "../controllers/ProvinceController";
import {authMiddleware} from "../middlewares/auth-middleware";

class ProvinceRoutes extends BaseRoutes{
    public routes():void{
        this.router.get("/", ProvinceController.index);
        this.router.post("/", authMiddleware, ProvinceController.create);
        this.router.get("/:id", ProvinceController.show);
        this.router.put("/:id", authMiddleware, ProvinceController.update);
        this.router.delete("/:id", authMiddleware, ProvinceController.delete);
    }
}

export default new ProvinceRoutes().router;