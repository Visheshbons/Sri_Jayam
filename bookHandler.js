// Import data from appConfig.js
import { app, chalk, cookieParser, express, log, err, warn, info, important } from "./appConfig.js";

// Optimized middleware setup and booking logic
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Redirect to "/book"
app.get("/book", (req, res) => {
    res.render("book.ejs");
    info("Booking page loaded");
});

// POST route for booking
app.post("/book", (req, res) => {
    if (req.cookies.booked === "true") {
        err("Booking already submitted.", "low");
        return res.status(400).redirect("/");
    }

    const { name, email, phone, date, time } = req.body;

    if (!name || !email || !phone || !date || !time) {
        err("Incomplete booking details submitted.", "low");
        return res.status(400).send("All fields are required.");
    }

    res.cookie("booked", "true");
    log(req.body);
    important("Booking submitted.");

    res.render("booking-confirmation.ejs", {
        name,
        email,
        phone,
        date,
        time,
    });
});