import BaseRoutes from "./BaseRoutes";

import VillageController from "../controllers/VillageController";
import {authMiddleware} from "../middlewares/auth-middleware";


class VillageRoutes extends BaseRoutes{
    public routes():void{
        this.router.get("/", VillageController.index);
        this.router.post("/", authMiddleware, VillageController.create);
        this.router.get("/:id", VillageController.show);
        this.router.put("/:id", authMiddleware, VillageController.update);
        this.router.delete("/:id", authMiddleware, VillageController.delete);
    }
}

export default new VillageRoutes().router;