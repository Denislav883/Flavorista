import Recipe from "../models/Recipe";

export default {
    getAll() {
        return Recipe.find();
    },
    createRecipe(recipeData) {
        return Recipe.create(recipeData);
    }
}