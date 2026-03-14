import { Schema, Types, model } from "mongoose";

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    _ownerId: {
        type: Types.ObjectId,
        ref: "User"
    }
});

const Recipe = model("Recipe", recipeSchema);

export default Recipe