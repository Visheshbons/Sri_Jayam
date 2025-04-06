// Import data from appConfig.js
import { app, chalk, express, log, err, warn, important, info, images } from "./appConfig.js";

// Optimized middleware setup and gallery route
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Listen for "/gallery" route
app.get("/gallery", (req, res) => {
    res.render("photos.ejs", { photos: images });
    info("Photo gallery loaded");
});