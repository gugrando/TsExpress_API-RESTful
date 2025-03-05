import {model, Schema} from "mongoose";

const noteSchema = new Schema({
    note: { type: String, required: true }
});

const movieSchema = new Schema(
    {
        title: {type: String},
        rating: {type: Number},
        description: {type: String},
        director: {type: String},
        stars: {type: Array},
        banner: {type: String},
        poster: {type: String},
        notes: [noteSchema]
    },
    {
        timestamps: true
    }
)

export const MovieModel = model("Movie", movieSchema);