const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        language: {
            type: String,
            required: true
        },

        duration: {
            type: String,
            required: true
        },

        releaseYear: {
            type: Number,
            required: true
        },

        rating: {
            type: Number,
            default: 0
        },

        director: {
            type: String
        },

        cast: {
            type: String
        },

        image: {
            type: String
        },

        trailerUrl: {
            type: String
        },

        views: {
            type: Number,
            default: 0
        },

        isFavorite: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "Movie",
        movieSchema
    );