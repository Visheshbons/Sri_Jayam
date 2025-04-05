// Import data from appConfig.js
import { app, port, portForward, chalk, cookieParser, express, getDateAndTime, log, err, warn, info, startTimer, endTimer, green, space, line, important } from "./appConfig.js";

// Quickly sets up cookies and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());



// Handle unspecified routes and redirect to 404.ejs
app.use((req, res) => {
    res.status(404).render("404.ejs", {
        url: req.originalUrl,
    });
    if (req.originalUrl == "/" || req.originalUrl == "/book" || req.originalUrl == "/contact") {
        err(`404: ${req.originalUrl}`, `high`);
    } else {
        err(`404: ${req.originalUrl}`, `low`);
    }
    warn(`ERR404 catcher activated`, `low`);
});