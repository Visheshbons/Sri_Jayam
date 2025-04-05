// Imports all the neccecary data
import express from 'express';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';

// Sets up some variables
const app = express();
const port = process.env.PORT || 3000;
const portForward = false; // Set to true if you want to use port forwarding

const log = (message) => console.log(message);
const info = (message) => console.log(`${chalk.cyan("Info:")} ${message}`);
const important = (message) => console.log(chalk.bgCyan.whiteBright("IMPORTANT:") + " " + chalk.cyan(message));

const err = (message, urgency) => {
    if (urgency === "high") {
        console.log(chalk.bgRed.yellowBright("FATAL:") + " " + chalk.red(message));
    } else if (urgency === "low") {
        console.log(chalk.bgRed.yellowBright("Error:") + " " + chalk.red(message));
    } else {
        console.log(chalk.red(message));
    }
};

const warn = (message, urgency) => {
    if (urgency === "high") {
        console.log(chalk.bgRedBright.yellowBright("WARN:") + " " + chalk.yellow(message));
    } else if (urgency === "low") {
        console.log(chalk.bgYellow("Warn:") + " " + chalk.yellow(message));
    } else {
        console.log(chalk.yellow(message));
    }
}

const green = chalk.greenBright;

const startTimer = (message) => console.time(message);
const endTimer = (message) => console.timeEnd(message);

const space = (num) => {
    for (let i = 0; i < num; i++) {
        console.log("");
    };
};

const line = (num) => {
    for (let i = 0; i < num; i++) {
        console.log(chalk.dim("---------------------------------------------------"));
    };
};

// Define the function "getDateAndTime()"
function getDateAndTime() {
    // get current date
    let date_time = new Date();

    // adjust 0 before single digit date
    let date = ("0" + date_time.getDate()).slice(-2);

    // get current month
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

    // get current year
    let year = date_time.getFullYear();

    // get current hours
    let hoursRaw = date_time.getHours();
    if (hoursRaw > 12) {
        var hours24 = hoursRaw - 12;
    } else {
        var hours24 = hoursRaw;
    };
    
    if (hours24 < 10) {
        var hours = "0" + hours24;
    } else {
        var hours = hours24;
    };

    // get current minutes
    let minutesRaw = date_time.getMinutes();
    if (minutesRaw < 10) {
        var minutes = "0" + minutesRaw;
    } else {
        var minutes = minutesRaw;
    };

    // get current seconds
    let secondsRaw = date_time.getSeconds();
    if (secondsRaw < 10) {
        var seconds = "0" + secondsRaw;
    } else {
        var seconds = secondsRaw;
    };

    // get AM or PM
    if (hoursRaw > 12) {
        var time = "PM";
    } else if (hoursRaw == 12) {
        var time = "PM";
    } else {
        var time = "AM";
    };

    const dateAndTime = `${date}-${month}-${year} ${hours}:${minutes}:${seconds} ${time}`;

    return dateAndTime;
};

export { app, port, portForward, chalk, cookieParser, express, getDateAndTime, log, err, warn, info, startTimer, endTimer, green, space, line, important };