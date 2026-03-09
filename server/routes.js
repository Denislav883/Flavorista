import { Router } from "express";

import authController from "./controllers/authController.js";
import recipeController from "./controllers/recipeController.js";

const routes = Router();

routes.use("/api/auth", authController);
routes.use("/api/recipes", recipeController);

export default routes;