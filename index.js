// Starts a timer to see how long the initialisation takes
console.time("Loading time");

// Import data from appConfig.js
import { app, port, portForward, chalk, cookieParser, express } from "./appConfig.js";

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
    console.log(`Server running on port ` + chalk.green(port) + `.`);
    console.log(``);

    // log date and time
    console.log(`Time of start: `);
    console.log(``);

    // log website info
    console.log(`Go to ` + chalk.dim(`http://localhost:${port}`) + ` to view the website.`);
    if (portForward) {
        console.log(`Go to ${chalk.dim(`https://p9npwlmh-${port}.aue.devtunnels.ms/`)} to view the website.`);
    };
    console.log(``);

    // log server commands
    console.log(`Type "rs" to restart the server.`);
    console.log(`Press CTRL + C to kill the server.`);
    console.log(``);

    // log info usage log details
    console.log(`The page loadings will be logged underneath.`)
    console.log(``);
    console.log(``);
});