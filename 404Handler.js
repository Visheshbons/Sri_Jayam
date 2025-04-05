// Import data from appConfig.js
import { app, port, portForward, chalk, cookieParser, express, getDateAndTime, log, err, warn, info, startTimer, endTimer, green, space, line, important } from "./appConfig.js";

// Quickly sets up cookies and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Handle unspecified routes and redirect to 404.ejs
app.use((req, res) => {
    const isCriticalRoute = ["/", "/book", "/contact"].includes(req.originalUrl);
    res.status(404).render("404.ejs", {
        url: req.originalUrl,
    });
    err(`404: ${req.originalUrl}`, isCriticalRoute ? "high" : "low");
    warn("ERR404 catcher activated", "low");
});