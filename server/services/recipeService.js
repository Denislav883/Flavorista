import Recipe from "../models/Recipe.js";

export default {
    getAll() {
        return Recipe.find();
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
        return Recipe.findByIdAndUpdate(id, recipeData, { runValidators: true });
    },
    deleteRecipe(id) {
        return Recipe.findByIdAndDelete(id);
    }
}