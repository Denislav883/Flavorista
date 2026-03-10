import Recipe from "../models/Recipe";

export default {
    getAll() {
        return Recipe.find();
    },
    getOne(id) {
        return Recipe.findById(id);
    },
    createRecipe(recipeData) {
        return Recipe.create(recipeData);
    }
}