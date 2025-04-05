// Starts a timer to see how long the initialisation takes
startTimer("Loading time");

// Import data from appConfig.js
import { app, port, portForward, chalk, cookieParser, express, getDateAndTime, log, err, warn, info, startTimer, endTimer, green } from "./appConfig.js";

// Quickly sets up cookies and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Redirect to "/"
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/services", (req, res) => {
    res.render("404.ejs");
});

app.get("/about", (req, res) => {
    res.render("404.ejs");
});

app.get("/contact", (req, res) => {
    res.render("404.ejs");
});

// Listen to port
app.listen(port, () => {
    // log server start
    log(`Server running on port ` + chalk.green(port) + `.`);
    log(``);

    // log date and time
    log(`Time of start: ${chalk.dim(getDateAndTime())}`);
    log(``);

    // log website info
    log(`Go to ` + chalk.dim(`http://localhost:${port}`) + ` to view the website.`);
    if (portForward) {
        log(`Go to ${chalk.dim(`https://p9npwlmh-${port}.aue.devtunnels.ms/`)} to view the website.`);
    };
    log(``);

    // log server commands
    log(`Type "rs" to restart the server.`);
    log(`Press CTRL + C to kill the server.`);
    log(``);

    // log log types
    info(`Here is some ${green(`info`)}`);
    warn(`This is a warning`);
    err(`This is an error`);

    // log info usage log details
    log(`The page loadings will be logged underneath.`)
    log(``);
    endTimer("Loading time");
    log(``);
    log(``);
});

setInterval(() => {
    fetch("https://sri-jayam.onrender.com")
        .then(() => {
            log("SELF PING");
            timeEnd("Ping Interval");
            time("Ping Interval");
        })
        .catch(err => {
            err("Ping failed:", err);
        });
}, 600000); // 600,000 milliseconds = 10 minutes