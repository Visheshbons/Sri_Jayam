// Starts a timer to see how long the initialisation takes
startTimer("Loading time");

// Import data from appConfig.js
import { app, port, portForward, chalk, cookieParser, express, getDateAndTime, log, err, warn, info, startTimer, endTimer, green, space, line, important } from "./appConfig.js";

// Quickly sets up cookies and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Redirect to "/"
app.get("/", (req, res) => {
    res.render("index.ejs");
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

// Redirect to "/book"
app.get("/book", (req, res) => {
    res.render("book.ejs");
    info(`Booking page loaded`);
});

// POST route for booking
app.post("/book", (req, res) => {
    log(req.body);
    const { name, email, phone, date, time } = req.body;

    if (!name || !email || !phone || !date || !time) {
        err("Incomplete booking details submitted.", "low");
        return res.status(400).send("All fields are required.");
    }

    important(`Booking submitted.`);

    // Render a confirmation page or send a success message
    res.render("booking-confirmation.ejs", {
        name,
        email,
        phone,
        date,
        time,
    });
});

// Handle unspecified routes and redirect to 404.ejs
app.use((req, res) => {
    res.status(404).render("404.ejs", {
        url: req.originalUrl,
    });
    err(`Page not found: ${req.originalUrl}`, `low`);
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