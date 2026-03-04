import { Router } from "express";
import authController from "./controllers/authController.js";

const routes = Router();

routes.use("/api/auth", authController);

export default routes;