const Movie = require("../models/Movie");

// Dashboard
exports.dashboard = async (req, res) => {
    try {
        const movies = await Movie.find()
            .sort({ createdAt: -1 });

        const trendingMovies = await Movie.find()
            .sort({ views: -1 })
            .limit(8);

        const topRatedMovies = await Movie.find()
            .sort({ rating: -1 })
            .limit(8);

        const recentMovies = await Movie.find()
            .sort({ createdAt: -1 })
            .limit(8);

        res.render("dashboard", {
            movies,
            trendingMovies,
            topRatedMovies,
            recentMovies
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

// Add Movie Page
exports.addMoviePage = (req, res) => {
    res.render("addMovie");
};

// Insert Movie
exports.insertMovie = async (req, res) => {
    try {

        let trailerUrl = req.body.trailerUrl;

        // Convert YouTube URL to Embed URL
        if (
            trailerUrl &&
            trailerUrl.includes("watch?v=")
        ) {
            trailerUrl = trailerUrl.replace(
                "watch?v=",
                "embed/"
            );
        }

        await Movie.create({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            language: req.body.language,
            duration: req.body.duration,
            releaseYear: req.body.releaseYear,
            rating: req.body.rating,
            director: req.body.director,
            cast: req.body.cast,
            image: req.body.image, 
            trailerUrl,
            views: 0,
            isFavorite: false
        });

        res.redirect("/");

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

// View Movies
exports.viewMovies = async (req, res) => {
    try {

        const movies = await Movie.find()
            .sort({ createdAt: -1 });

        res.render("viewMovies", {
            movies
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

// Movie Details
exports.movieDetails = async (req, res) => {
    try {

        const movie = await Movie.findById(
            req.params.id
        );

        if (!movie) {
            return res.status(404)
                .send("Movie not found");
        }

        res.render("movieDetails", {
            movie
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

// Watch Movie
exports.watchMovie = async (req, res) => {
    try {

        const movie = await Movie.findById(
            req.params.id
        );

        if (!movie) {
            return res.status(404)
                .send("Movie not found");
        }

        movie.views += 1;

        await movie.save();

        res.render("watchMovie", {
            movie
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

// Edit Movie Page
exports.editMoviePage = async (req, res) => {
    try {

        const movie = await Movie.findById(
            req.params.id
        );

        if (!movie) {
            return res.status(404)
                .send("Movie not found");
        }

        res.render("editMovie", {
            movie
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

// Update Movie
exports.updateMovie = async (req, res) => {
    try {

        const movie = await Movie.findById(
            req.params.id
        );

        if (!movie) {
            return res.status(404)
                .send("Movie not found");
        }

        let trailerUrl = req.body.trailerUrl;

        if (
            trailerUrl &&
            trailerUrl.includes("watch?v=")
        ) {
            trailerUrl = trailerUrl.replace(
                "watch?v=",
                "embed/"
            );
        }

        movie.title = req.body.title;
        movie.category = req.body.category;
        movie.description = req.body.description;
        movie.language = req.body.language;
        movie.duration = req.body.duration;
        movie.releaseYear = req.body.releaseYear;
        movie.rating = req.body.rating;
        movie.director = req.body.director;
        movie.cast = req.body.cast;
        movie.image = req.body.image; // Online Image URL
        movie.trailerUrl = trailerUrl;

        await movie.save();

        res.redirect("/viewMovies");

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

// Delete Movie
exports.deleteMovie = async (req, res) => {
    try {

        const movie =
            await Movie.findByIdAndDelete(
                req.params.id
            );

        if (!movie) {
            return res.status(404)
                .send("Movie not found");
        }

        res.redirect("/viewMovies");

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

// Search Movie
exports.searchMovie = async (req, res) => {
    try {

        const keyword = req.query.keyword;

        const movies = await Movie.find({
            $or: [
                {
                    title: {
                        $regex: keyword,
                        $options: "i"
                    }
                },
                {
                    category: {
                        $regex: keyword,
                        $options: "i"
                    }
                }
            ]
        });

        res.render("dashboard", {
            movies,
            trendingMovies: movies,
            topRatedMovies: movies,
            recentMovies: movies
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

// Category Filter
exports.categoryMovies = async (req, res) => {
    try {

        const movies = await Movie.find({
            category: req.params.name
        });

        res.render("dashboard", {
            movies,
            trendingMovies: movies,
            topRatedMovies: movies,
            recentMovies: movies
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

// Toggle Favorite
exports.favoriteMovie = async (req, res) => {
    try {

        const movie = await Movie.findById(
            req.params.id
        );

        if (!movie) {
            return res.status(404)
                .send("Movie not found");
        }

        movie.isFavorite =
            !movie.isFavorite;

        await movie.save();

        res.redirect("/favorites");

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

// Favorite Movies Page
exports.favoriteMovies = async (req, res) => {
    try {

        const movies = await Movie.find({
            isFavorite: true
        });

        res.render("favorites", {
            movies
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};