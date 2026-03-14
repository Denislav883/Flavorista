import Recipe from "../models/Recipe.js";

export default {
    getAll(filter) {
        return Recipe.find(filter);
    },
    getOne(id) {
        return Recipe.findById(id);
    },
    createRecipe(recipeData, ownerId) {
        return Recipe.create({
            ...recipeData,
            _ownerId: ownerId
        });
    },
    updateRecipe(id, recipeData) {
        return Recipe.findByIdAndUpdate(id, recipeData, { runValidators: true, returnDocument: "after" });
    },
    deleteRecipe(id) {
        return Recipe.findByIdAndDelete(id);
    }
}