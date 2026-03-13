import { Router } from "express";

import recipeService from "../services/recipeService.js";

const recipeController = Router();

recipeController.get("/", async (req, res) => {
    try {
        const recipes = await recipeService.getAll();

        res.status(200).json(recipes || []);
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

        res.status(200).json({ recipe });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

recipeController.post("/", async (req, res) => {
    try {
        const { title, ingredients, instructions, time, image } = req.body;
        const ownerId = req.user.id;

        if (!title || !ingredients || !instructions || !time || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const recipeData = {
            title,
            ingredients,
            instructions,
            time,
            image
        };

        const recipe = await recipeService.createRecipe(recipeData, ownerId);

        res.status(201).json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

recipeController.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;
        const recipeData = req.body;

        const recipe = await recipeService.getOne(id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        if (recipe._ownerId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const updatedRecipe = await recipeService.updateRecipe(id, recipeData);

        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

recipeController.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;

        const recipe = await recipeService.getOne(id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        if (recipe._ownerId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        await recipeService.deleteRecipe(id);

        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

export default recipeController;