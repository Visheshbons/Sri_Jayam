// Import data from appConfig.js
import { app, port, portForward, chalk, cookieParser, express, getDateAndTime, log, err, warn, info, startTimer, endTimer, green, space, line, important } from "./appConfig.js";

// Quickly sets up cookies and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());



// Redirect to "/book"
app.get("/book", (req, res) => {
    res.render("book.ejs");
    info(`Booking page loaded`);
});

// POST route for booking
app.post("/book", (req, res) => {
    // Check if the request body contains all required fields
    if (req.cookies.booked == `true`) {
        return res.status(400).redirect("/");
        err("Booking already submitted.", "low");
    } else {
        res.cookie(`booked`, `true`);
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
    };
});