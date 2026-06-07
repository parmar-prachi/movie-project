const express =
    require("express");

const router =
    express.Router();

const multer =
    require("multer");

const movieController =
    require(
        "../controllers/movieController"
    );

// Storage
const storage =
    multer.diskStorage({

        destination:
            (req, file, cb) => {

                if (
                    file.fieldname ===
                    "image"
                ) {

                    cb(
                        null,
                        "public/uploads/images"
                    );

                } else {

                    cb(
                        null,
                        "public/uploads/videos"
                    );

                }

            },

        filename:
            (req, file, cb) => {

                cb(
                    null,
                    Date.now() +
                    "-" +
                    file.originalname
                );

            }

    });

const upload =
    multer({
        storage
    });

// Dashboard
router.get(
    "/",
    movieController.dashboard
);

// Add Movie
router.get(
    "/addMovie",
    movieController.addMoviePage
);

router.post(
    "/addMovie",
    movieController.insertMovie
);

// View Movies
router.get(
    "/viewMovies",
    movieController.viewMovies
);

// Movie Details
router.get(
    "/movie/:id",
    movieController.movieDetails
);

// Watch Movie
router.get(
    "/watch/:id",
    movieController.watchMovie
);

// Edit Movie
router.get(
    "/editMovie/:id",
    movieController.editMoviePage
);

router.post(
    "/addMovie",
    movieController.insertMovie
);
// Update Movie
router.post(
    "/updateMovie/:id",
    movieController.updateMovie
);
// Delete Movie
router.get(
    "/deleteMovie/:id",
    movieController.deleteMovie
);

// Search
router.get(
    "/search",
    movieController.searchMovie
);

// Category
router.get(
    "/category/:name",
    movieController.categoryMovies
);

// Favorite
router.get(
    "/favorite/:id",
    movieController.favoriteMovie
);

// Favorites Page
router.get(
    "/favorites",
    movieController.favoriteMovies
);

module.exports =
    router;