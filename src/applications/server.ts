import express from "express";
import { errorMiddleware } from "../middlewares/error-middleware";
import ProvinceRoutes from "../routes/ProvinceRoute";
import RegencyRoutes from "../routes/RegencyRoute";
import DistrictRoutes from "../routes/DistrictRoute";
import VillageRoutes from "../routes/VillageRoute";
import UserRoute from "../routes/UserRoute";

export const server=express();
server.use(express.json());

server.use("/api/v1/provinces", ProvinceRoutes);
server.use("/api/v1/regencies", RegencyRoutes);
server.use("/api/v1/districts", DistrictRoutes);
server.use("/api/v1/villages", VillageRoutes);

server.use("/api/v1/users", UserRoute);
server.use(errorMiddleware)