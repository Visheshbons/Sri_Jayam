// Starts a timer to see how long the initialisation takes
startTimer("Loading time");

// Import data from appConfig.js
import { app, port, portForward, chalk, cookieParser, express, getDateAndTime, log, err, warn, info, startTimer, endTimer, green, space, line, important } from "./appConfig.js";

// Optimized middleware setup and gallery route
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Listen for "/gallery" route
app.get("/gallery", (req, res) => {
    const photoCounts = {
        makeup: 3,
        salonTreatments: 3,
        waxing: 3,
        tailoring: 3,
        embroidery: 3,
    };

    res.render("photos.ejs", photoCounts);
});