import { Router } from "express";

import recipeService from "../services/recipeService.js";

const recipeController = Router();

recipeController.get("/", async (req, res) => {
    try {
        const furnitures = await recipeService.getAll();

        res.status(200).json(furnitures || []);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

export default recipeController;