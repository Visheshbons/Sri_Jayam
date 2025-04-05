// Import data from appConfig.js
import { app, port, portForward, chalk, cookieParser, express, getDateAndTime, log, err, warn, info, startTimer, endTimer, green, space, line, important } from "./appConfig.js";

// Quickly sets up cookies and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Render "/"
app.get("/", (req, res) => {
    const visited = req.cookies.visited === "true";
    if (!visited) {
        res.cookie("visited", "true");
    }
    res.render("index.ejs", { visited });
    info(`Home page loaded`);
});

// Redirect to "/contact"
app.get("/contact", (req, res) => {
    res.render("contact.ejs", {
        email: `ceo.srijayambeautyparlour@gmail.com`,
        phone: `Error404: Not found`,
    });
    info(`Contact page loaded`);
});