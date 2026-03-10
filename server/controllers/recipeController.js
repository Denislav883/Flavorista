import { Router } from "express";

import recipeService from "../services/recipeService.js";

const recipeController = Router();

recipeController.get("/", async (req, res) => {
    try {
        const furnitures = await recipeService.getAll();

        res.status(200).json(furnitures || []);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

recipeController.post("/", async (req, res) => {
    try {
        const recipeData = req.body;

        if (!title || !ingredients || !instructions || !time || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const recipe = await recipeService.createRecipe(recipeData);

        res.status(201).json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

recipeController.get("/:id", async (req, res) => {

    try {
        const id = req.params.id;

        const recipe = await recipeService.getOne(id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json({recipe});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default recipeController;