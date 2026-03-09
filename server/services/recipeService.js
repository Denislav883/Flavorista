import Recipe from "../models/Recipe";

export default {
    getAll() {
        return Recipe.find();
    },
}