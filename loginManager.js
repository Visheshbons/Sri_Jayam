// Imports required data
import { app, users, getDateAndTime, SHA1, log, warn, err, important } from './appConfig.js';
import chalk from 'chalk';

// Replaces constants with variables
let LLC = 1; // Login Load Count
let logon = false;

// Renders "/login.js"
app.get("/login", (req, res) => {
    res.render("login.ejs");
    log(`Login page loaded. (${LLC})`);
    LLC++;
});

// Handles the "/login" request
app.post("/login", (req, res) => {
    logon = false;

    if(!logon){
        let username = SHA1(req.body.username);
        let password = SHA1(req.body.password);

        if (username === users.username && password === users.password) {
            res.cookie('username', SHA1(req.body.username), { maxAge: 900000, httpOnly: true });
            logon = true;
            important(chalk.green(` User "${req.body.username}" logged in successfully.`));
            res.redirect("/admin");
        };

        if (!logon){
            res.redirect("/");
            warn(`Attempted login with username "${req.body.username}" and password "${req.body.password}.`, `high`);
        };
    };
});

// Handles the "/LogoutFunc" request
app.post("/LogoutFunc", (req, res) => {
    console.log(`User ${chalk.green(req.cookies.username)} logging out. Clearing cookies...`)
    res.clearCookie('username');
    console.log(`Cookies cleared.`)
    console.log(chalk.italic(getDateAndTime()));
    res.redirect("/")
    console.log(``)
});

app.get("/admin", (req, res) => {
    if (req.cookies.username === users.username) {
        res.render("admin.ejs", {
            null: null,
        });
        log(`Admin page loaded.`);
    } else {
        res.redirect("/login");
        warn(`Attempted access to admin page without login.`, `high`);
    };
});