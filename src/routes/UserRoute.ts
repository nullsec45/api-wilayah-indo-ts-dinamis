import BaseRoutes from "./BaseRoutes";

import UserController from "../controllers/UserController";
import {authMiddleware} from "../middlewares/auth-middleware";

class UserRoutes extends BaseRoutes{
    public routes():void{
        this.router.post("/auth/login", UserController.login);
        this.router.post("/auth/register", UserController.register);
        this.router.put("/:id", authMiddleware, UserController.update);
        this.router.delete("/:id", UserController.delete);
    }
}

export default new UserRoutes().router;