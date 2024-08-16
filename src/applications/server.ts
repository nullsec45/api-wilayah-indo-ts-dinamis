import express from "express";
import { errorMiddleware } from "../middlewares/error-middleware";
import ProvinceRoute from "../routes/ProvinceRoute";

export const server=express();
server.use(express.json());

server.use("/api/v1/provinces", ProvinceRoute);
server.use(errorMiddleware)