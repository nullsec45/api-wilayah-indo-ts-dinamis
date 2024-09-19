import BaseRoutes from "./BaseRoutes";

import RegencyController from "../controllers/RegencyController";
import { authMiddleware } from "../middlewares/auth-middleware";

class RegencyRoutes extends BaseRoutes{
    public routes():void{
        this.router.get("/", RegencyController.index);
        this.router.post("/", authMiddleware,  RegencyController.create);
        this.router.get("/:id", RegencyController.show);
        this.router.put("/:id", authMiddleware, RegencyController.update);
        this.router.delete("/:id", authMiddleware, RegencyController.delete);
    }
}

export default new RegencyRoutes().router;