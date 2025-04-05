// Starts a timer to see how long the initialisation takes
startTimer("Loading time");

// Import data from appConfig.js
import { app, port, portForward, chalk, cookieParser, express, getDateAndTime, log, err, warn, info, startTimer, endTimer, green, space, line, important } from "./appConfig.js";

// Quickly sets up cookies and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

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
    important(`This is important`);
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

startTimer("Ping Interval");

setInterval(() => {
    fetch("https://sri-jayam.onrender.com")
        .then(() => {
            log("SELF PING");
            endTimer("Ping Interval");
            startTimer("Ping Interval");
        })
        .catch(error => {
            err(error, `high`);
        });
}, 600000); // 600,000 milliseconds = 10 minutes


// Imports the other JS files so that seperate APIs can be used
import './homePageHandler.js';
import './bookHandler.js';
import './photoHandler.js';
import './404Handler.js';