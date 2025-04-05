// Starts a timer to see how long the initialisation takes
startTimer("Loading time");

// Import data from appConfig.js
import { app, port, portForward, chalk, cookieParser, express, getDateAndTime, log, err, warn, info, startTimer, endTimer, green, space, line, } from "./appConfig.js";

// Quickly sets up cookies and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Redirect to "/"
app.get("/", (req, res) => {
    res.render("index.ejs");
    info(`Home page loaded`);
});

app.get("/services", (req, res) => {
    res.render("404.ejs");
    // info(`Services page loaded`);
    err(`Services page not found`, `low`);
});

app.get("/about", (req, res) => {
    res.render("404.ejs"); 
    // info(`About page loaded`);
    err(`About page not found`, `low`);
});

app.get("/contact", (req, res) => {
    res.render("404.ejs");
    // info(`Contact page loaded`);
    err(`Contact page not found`, `low`);
});

// Listen to port
app.listen(port, () => {
    // log server start
    log(`Server running on port ` + chalk.green(port) + `.`);
    space(1)

    // log date and time
    log(`Time of start: ${chalk.dim(getDateAndTime())}`);
    space(1)

    // log website info
    log(`Go to ` + chalk.dim(`http://localhost:${port}`) + ` to view the website.`);
    if (portForward) {
        log(`Go to ${chalk.dim(`https://p9npwlmh-${port}.aue.devtunnels.ms/`)} to view the website.`);
    };
    space(1)

    // log server commands
    log(`Type "rs" to restart the server.`);
    log(`Press CTRL + C to kill the server.`);
    space(1)

    // log log types
    info(`Here is some ${green(`info`)}`);
    warn(`This is a warning`, `low`);
    err(`This is an error`, `low`);
    space(1)

    // log info usage log details
    log(`The page loadings will be logged underneath.`)
    space(1)
    endTimer("Loading time");
    space(1)
    line(1)
    space(1)
});

setInterval(() => {
    fetch("https://sri-jayam.onrender.com")
        .then(() => {
            log("SELF PING");
            timeEnd("Ping Interval");
            time("Ping Interval");
        })
        .catch(err => {
            err(("Ping failed:", err), "high");
        });
}, 600000); // 600,000 milliseconds = 10 minutes