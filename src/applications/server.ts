import express from "express";
import { errorMiddleware } from "../middlewares/error-middleware";
import ProvinceRoutes from "../routes/ProvinceRoute";
import RegencyRoutes from "../routes/RegencyRoute";

export const server=express();
server.use(express.json());

server.use("/api/v1/provinces", ProvinceRoutes);
server.use("/api/v1/regencies", RegencyRoutes);
server.use(errorMiddleware)