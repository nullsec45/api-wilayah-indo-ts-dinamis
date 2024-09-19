import BaseRoutes from "./BaseRoutes";

import DistrictController from "../controllers/DistrictController";
import {authMiddleware} from "../middlewares/auth-middleware";


class DistrictRoutes extends BaseRoutes{
    public routes():void{
        this.router.get("/", DistrictController.index);
        this.router.post("/", authMiddleware, DistrictController.create);
        this.router.get("/:id", DistrictController.show);
        this.router.put("/:id", authMiddleware, DistrictController.update);
        this.router.delete("/:id", authMiddleware, DistrictController.delete);
    }
}

export default new DistrictRoutes().router;