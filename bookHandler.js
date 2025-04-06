// Import data from appConfig.js
import { app, chalk, cookieParser, express, log, err, warn, info, important, users, } from "./appConfig.js";

// Optimized middleware setup and booking logic
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

let bookingID = 0; // Initialize booking ID
let bookings = {}; // Initialize bookings object

// Redirect to "/book"
app.get("/book", (req, res) => {
    res.render("book.ejs");
    info("Booking page loaded");
});

// POST route for booking
app.post("/book", (req, res) => {
    if (req.cookies.booked === "true") {
        err("Booking already submitted.", "low");
        res.clearCookie("booked");
        return res.status(400).redirect("/");
    };

    const { name, email, phone, date, time } = req.body;

    if (!name || !email || !phone || !date || !time) {
        err("Incomplete booking details submitted.", "low");
        return res.status(400).send("All fields are required.");
    };

    bookingID++;

    bookings[bookingID] = {
        name: name,
        email: email,
        phone: phone,
        date: date,
        time: time,
    };
    log(bookings);

    res.cookie("booked", "true");
    important("Booking submitted.");

    res.render("booking-confirmation.ejs", {
        name,
        email,
        phone,
        date,
        time,
    });
});

app.get("/bookings", (req, res) => {
    res.render("bookings.ejs", { bookings: bookings });
    info("Bookings page loaded");
});

app.get("/admin", (req, res) => {
    if (req.cookies.username === users.username) {
        res.render("admin.ejs", { bookings: bookings });
        log(`Admin page loaded.`);
    } else {
        res.redirect("/login");
        warn(`Attempted access to admin page without login.`, `high`);
    };
});