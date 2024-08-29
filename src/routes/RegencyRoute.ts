import BaseRoutes from "./BaseRoutes";

import RegencyController from "../controllers/RegencyController";

class RegencyRoutes extends BaseRoutes{
    public routes():void{
        this.router.get("/", RegencyController.index);
        this.router.post("/", RegencyController.create);
        this.router.get("/:id", RegencyController.show);
        this.router.put("/:id", RegencyController.update);
        this.router.delete("/:id", RegencyController.delete);
    }
}

export default new RegencyRoutes().router;