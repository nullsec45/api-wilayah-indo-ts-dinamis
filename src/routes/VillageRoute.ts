import BaseRoutes from "./BaseRoutes";

import VillageController from "../controllers/VillageController";

class VillageRoutes extends BaseRoutes{
    public routes():void{
        this.router.get("/", VillageController.index);
        this.router.post("/", VillageController.create);
        this.router.get("/:id", VillageController.show);
        this.router.put("/:id", VillageController.update);
        this.router.delete("/:id", VillageController.delete);
    }
}

export default new VillageRoutes().router;