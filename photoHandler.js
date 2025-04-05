// Starts a timer to see how long the initialisation takes
startTimer("Loading time");

// Import data from appConfig.js
import { app, port, portForward, chalk, cookieParser, express, getDateAndTime, log, err, warn, info, startTimer, endTimer, green, space, line, important } from "./appConfig.js";

// Quickly sets up cookies and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());


// Listen for "/gallery" route
app.get("/gallery", (req, res) => {
    // Render the gallery page with the photos
    res.render("photos.ejs", {
        makeup: 0,
        salonTreatments: 0,
        waxing: 0,
        tailoring: 0,
        embroidery: 0,
    });
});