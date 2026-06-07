const express = require("express");
const path = require("path");

const connectDB =
    require("./config/db");

const movieRoutes =
    require("./routes/movieRoutes");

const app = express();

connectDB();

app.set("view engine", "ejs");

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(
    "/uploads",
    express.static(
        path.join(
            __dirname,
            "public/uploads"
        )
    )
);

app.use("/", movieRoutes);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(
        `Server Running On ${PORT}`
    );
});